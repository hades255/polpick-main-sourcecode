import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { OrdersRepository } from "src/order/repository/order.repository";
import { TicketRepository } from "src/tickets/repository/tickets.repository";
import { Users, UsersDocument } from "src/users/schemas/users.schema";
// import { SocketGateway } from "src/websocket/websocket.gateway";

@Injectable()
export class TicketHelper {
    constructor(
        private readonly ticketRepository: TicketRepository,
        @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
        private readonly ordersRepository: OrdersRepository,
        // private readonly socketGateway: SocketGateway
    ) { }

    async handleBetPlaced(betObject: TicketDataParam): Promise<void> {
        try {
            console.log('betObject', betObject);
            let ticketsArray: any = [];

            const { type, walletId, winningStatus } = betObject;

            const user = await this.userModel.findOne({ walletId: walletId, isDeleted: false });
            if (!user?._id) return;

            if (type == 'bet') {
                /* Handle Betting Event Tickets Distribution */
                user.betsCount += 1;

                // (100) First deposit
                if (!user.firstTrade) {
                    ticketsArray.push({ walletId, tickets: 100, type: 'firstTrade', date: new Date() });
                    user.firstTrade = true;
                }

                // (5) Every 5 bets
                if (user.betsCount >= 5) {
                    ticketsArray.push({ walletId, tickets: 5, type: 'fiveBets', date: new Date() });
                    user.betsCount = 0;
                }
            } else {
                console.log({ betObjectInfo: betObject });
                if(betObject?.orderId && mongoose.isValidObjectId(betObject.orderId) && !isNaN(betObject?.totalReturn)) {
                    await this.ordersRepository.updateById({ winningAmount: betObject.totalReturn }, new Types.ObjectId(betObject.orderId));
                }

                /* Handle Result Event Tickets Distribution */
                if (winningStatus) {
                    user.winningCount += 1;
                    user.winStreakCount += 1;
                } else {
                    user.winStreakCount = 0;
                }

                // (25) Every 5 Wins (Streak does not matter)
                while (user.winningCount >= 5) {
                    ticketsArray.push({ walletId, type: 'fiveWins', tickets: 25 });
                    user.winningCount -= 5;
                }

                /* Handle Winning Streaks */
                if (user.winStreakCount >= 40) {
                    // (50) Every 5 wins streak
                    ticketsArray.push({ walletId, type: 'fortyWinsStreak', tickets: 5000 });
                    user.winStreakCount -= 40; // Reset Streak After Max Rewards
                } else if (user.winStreakCount == 20) {
                    // (500)  Every 10 win streak
                    ticketsArray.push({ walletId, type: 'twentyWinsStreak', tickets: 1000 });
                } else if (user.winStreakCount == 10) {
                    // (1000)  Every 20 win streak
                    ticketsArray.push({ walletId, type: 'tenWinsStreak', tickets: 500 });
                } else if (user.winStreakCount == 5) {
                    // (5000)  Every 40 win streak
                    ticketsArray.push({ walletId, type: 'fiveWinsStreak', tickets: 50 });
                }
            }

            await user.save();
            if (ticketsArray.length > 0) {
                await this.ticketRepository.save(ticketsArray);

                if(global.socketIo) {
                    const ticketsActivity = await this.handleAchievementPercentageCalculation(walletId);
                    global?.socketIo?.emit('user-ticket-activity-report-' + walletId, ticketsActivity);
                }
                // await this.socketGateway.handleUserTicketActivityReport({ walletId: walletId });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async handleAchievementPercentageCalculation(walletId: string) {
        try {
            const achievements = {
                'firstTrade': 0,
                'fiveBets': 0,
                'fiveWinsStreak': 0,
                'fiveWins': 0,
                'tenWinsStreak': 0,
                'twentyWinsStreak': 0,
                'fortyWinsStreak': 0,
                'totalTicketsCount': 0
            };

            const user = await this.userModel.findOne({ walletId: walletId, isDeleted: false });
            if (!user?._id) return;

            const totalTicketsCount = await this.ticketRepository.getUserTotalTicketsCount({ walletId: walletId });
            achievements['totalTicketsCount'] = totalTicketsCount;

            if (user.firstTrade) {
                achievements['firstTrade'] = 100;
            }

            const fiveBetsPercentage = user.betsCount ? user.betsCount * 100 / 5 : 0
            achievements['fiveBets'] = fiveBetsPercentage > 100 ? 100 : fiveBetsPercentage;

            const fiveWinsPercentage = user.winningCount ? user.winningCount * 100 / 5 : 0
            achievements['fiveWins'] = fiveWinsPercentage > 100 ? 100 : fiveWinsPercentage;

            const fiveWinsStreakPercentage = user.winStreakCount ? user.winStreakCount * 100 / 5 : 0;
            achievements['fiveWinsStreak'] = fiveWinsStreakPercentage > 100 ? 100 : fiveWinsStreakPercentage;

            const tenWinsStreakPercentage = user.winStreakCount ? user.winStreakCount * 100 / 10 : 0;
            achievements['tenWinsStreak'] = tenWinsStreakPercentage > 100 ? 100 : tenWinsStreakPercentage;

            const twentyWinsStreakPercentage = user.winStreakCount ? user.winStreakCount * 100 / 20 : 0;
            achievements['twentyWinsStreak'] = twentyWinsStreakPercentage > 100 ? 100 : twentyWinsStreakPercentage;

            const fortyWinsStreakPercentage = user.winStreakCount ? user.winStreakCount * 100 / 40 : 0;
            achievements['fortyWinsStreak'] = fortyWinsStreakPercentage > 100 ? 100 : fortyWinsStreakPercentage;

            return achievements;
        } catch (error) {
            console.error(error);
        }
    }
}

interface TicketDataParam {
    type: 'bet' | 'result';
    walletId: string;
    winningStatus: boolean;
    orderId?: string;
    totalReturn?: number;
}