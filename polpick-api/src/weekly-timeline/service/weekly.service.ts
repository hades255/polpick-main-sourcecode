import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as _ from 'underscore';
import { ApiResponseType } from 'src/common/types/api-response.type';
import { TicketRepository } from 'src/tickets/repository/tickets.repository';
import * as moment from 'moment';
import { WeeklyJackpotHistoryListDto, WeeklyJackpotListDto } from '../dto/weekly.dto';
import { OrdersRepository } from 'src/order/repository/order.repository';
import { JackpotHistoryRepository } from 'src/jackpot-history/repository/jackpot-history.repository';

@Injectable()
export class WeeklyService {
    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly ordersRepository: OrdersRepository,
        private readonly jackpotHistoryRepository: JackpotHistoryRepository
    ) { }

    async getWeeklyWinnersListing(listingDto: WeeklyJackpotHistoryListDto): Promise<ApiResponseType> {
        try {
            const records = await this.jackpotHistoryRepository.fetchJackpotHistoryListing(listingDto);
            return { success: true, data: records, message: "Weekly winners history fetched successfully." };
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    };


    async getWeeklyJackpotList(listingDto: WeeklyJackpotListDto): Promise<ApiResponseType> {
        try {
            const totalJackpotAmount = await this.ordersRepository.getWeeklyJackpotAmount();

            const firstPrize = totalJackpotAmount * 0.6; // 60%
            const secondPrize = totalJackpotAmount * 0.3; // 30%
            const thirdPrize = totalJackpotAmount * 0.1; // 10%
            const jackpotAmountArray = [firstPrize, secondPrize, thirdPrize];

            const ticketsData = await this.ticketRepository.getWeeklyJackpotList(jackpotAmountArray);

            let userRankingData: any = {
                rank: 0,
                weeklyTicketsCount: 0,
                // totalJackpotPrize: parseFloat(totalJackpotAmount).toFixed(2),
                totalJackpotPrize: parseFloat(totalJackpotAmount),
                endTime: moment().utc().endOf('week').unix(),
                currentTime: moment().utc().unix(),
            };

            if (listingDto.walletId) {
                const foundUser = ticketsData.find(val => val.walletId === listingDto.walletId);
                if (foundUser) {
                    userRankingData = {
                        rank: foundUser.rank,
                        weeklyTicketsCount: foundUser.total_tickets_count,
                        // totalJackpotPrize: parseFloat(totalJackpotAmount).toFixed(2),
                        totalJackpotPrize: parseFloat(totalJackpotAmount),
                        endTime: moment().utc().endOf('week').unix(),
                        currentTime: moment().utc().unix(),
                    };
                }
            }

            return { success: true, data: ticketsData, user_data: userRankingData, message: 'Weekly jackpot listing fetched successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }


    async getWeeklyJackpotStats(): Promise<ApiResponseType> {
        try {
            const totalJackpotAmount = await this.ordersRepository.getWeeklyJackpotAmount();

            let statsData: any = {
                // totalJackpotAmount: parseFloat(totalJackpotAmount).toFixed(2),
                totalJackpotAmount: parseFloat(totalJackpotAmount),
                endTime: moment().utc().endOf('week').unix(),
                currentTime: moment().utc().unix(),
            };

            return { success: true, data: statsData, message: 'Weekly jackpot stats fetched successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

}
