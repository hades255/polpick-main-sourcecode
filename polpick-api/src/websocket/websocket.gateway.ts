import { InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ethers } from 'ethers';
import { IMakeTrade, ChatHistory, IGameActivityReport, IUserTicketActivity } from './interface/websocket.interface';
import { SocketService } from './websocket.service';
import { BetCalculator } from 'src/helpers/bet-calculator.helper';
import { OrdersRepository } from 'src/order/repository/order.repository';
import { GameCurrentRepository } from 'src/game/repository/game-current.repository';
import { TicketHelper } from 'src/helpers/ticket.helper';

@WebSocketGateway({ cors: true, transports: ['websocket'] })
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    // private readonly BINANCE_TRADE: string;
    private chat_history: ChatHistory[] = [];
    private connectedUsersCount: number = 0;

    constructor(
        private readonly logger: Logger,
        private readonly orderRepository: OrdersRepository,
        private readonly gameCurrentRepo: GameCurrentRepository,
        private readonly ticketHelper: TicketHelper
    ) {
        // this.BINANCE_TRADE = configService.get('BINANCE_WEBSOCKET_URL') + 'btcusdt@trade';
        // this.initializeBinance();
    }


    handleConnection(client: Socket, ...args: any[]) {
        try {
            const address = client.handshake.address;
            console.log(`New connection from: ${address}`);
            this.connectedUsersCount += 1;
            this.handleLiveUsersCount();
        } catch (error) {
            console.error(error.message);
        }
    }

    handleDisconnect(client: Socket) {
        try {
            const address = client.handshake.address;
            console.log(`Disconnected from: ${address}`);
            this.connectedUsersCount -= 1;
            this.handleLiveUsersCount();
        } catch (error) {
            console.error(error.message);
        }
    }

    @WebSocketServer()
    io: Server;

    afterInit(server: Server) {
        global.socketIo = this.io;
        this.logger.debug('Socket.io initialized.');
    }

    // private initializeBinance(): void {
    //     const binanceWebSocket = new WebSocket(this.BINANCE_TRADE);

    //     // / Handle binance websocket connection /
    //     binanceWebSocket.on('open', () => {
    //         this.logger.debug('Binance ws connection established.');
    //     });

    //     binanceWebSocket.on('message', (data) => {
    //         const tradeData = JSON.parse(data.toString()) as IBinanceTrade;
    //         // if (moment().isAfter(moment(lastEmit).add(.100, 'second').format())) {
    //         // lastEmit = moment().format();
    //         const randomDigit1 = Math.floor(Math.random() * 9);
    //         const randomDigit2 = Math.floor(Math.random() * 9);
    //         global.btcPrice = tradeData.p;
    //         tradeData.p = (tradeData.p).slice(0, 8) + randomDigit1 + randomDigit2
    //         // console.log("Btc Price", (tradeData.p).slice(0,8))
    //         // this.logger.log("Trading Graph", tradeData)
    //         this.io.emit("TradingGraphPlot", tradeData);
    //         // }
    //     });

    //     binanceWebSocket.on('error', (error) => {
    //         this.logger.error('Binance websocket error:', error.message);
    //     });

    //     binanceWebSocket.on('close', () => {
    //         this.logger.error('Binance websocket connection closed.');
    //     });
    // }




    @SubscribeMessage('make_trade')
    async handleTrade(@ConnectedSocket() client: Socket, @MessageBody() makeTradeDto: IMakeTrade) {
        /* Save order information */
        const isAffiliateUser = makeTradeDto.referralLink?.trim() ? true : false;
        const deductionsData = new BetCalculator(makeTradeDto.tradeAmount, isAffiliateUser).calculateDeductions();

        const tradeData = { ...makeTradeDto, ...deductionsData, poolId: ethers.encodeBytes32String(makeTradeDto.poolId) };
        const orderData = await this.orderRepository.save(tradeData);
    }


    @SubscribeMessage('trader_list_30')
    async handleTraderList() {
        const upUsers = global.tradeUsers.filter(val => val.upOrDown);
        const downUsers = global.tradeUsers.filter(val => !val.upOrDown);

        const totalUpAmount = upUsers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.tradeAmount;
        }, 0);

        const totalDownAmount = downUsers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.tradeAmount;
        }, 0);

        const totalTrade = global.tradeUsers.reduce((accumulator, currentValue) => {
            return accumulator += currentValue.tradeAmount;
        }, 0);

        const profitsInfoUpUsers = BetCalculator.calculateProfitForPlayers(upUsers, totalDownAmount);
        const profitsInfoDownUsers = BetCalculator.calculateProfitForPlayers(downUsers, totalUpAmount);

        this.io.emit('trader_list_30', {
            up_array: upUsers,
            down_array: downUsers,
            total_count: global.tradeUsers.length,
            up_total: totalUpAmount,
            down_total: totalDownAmount,
            total_trade: totalTrade,
            up_return_percentage: profitsInfoUpUsers,
            down_return_percentage: profitsInfoDownUsers,
        });
    }


    @SubscribeMessage('trader_list_15')
    async handleTraderListTwo() {
        const upUsers = global.tradeUsersTwo.filter(val => val.upOrDown);
        const downUsers = global.tradeUsersTwo.filter(val => !val.upOrDown);

        const totalUpAmount = upUsers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.tradeAmount;
        }, 0);

        const totalDownAmount = downUsers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.tradeAmount;
        }, 0);

        const totalTrade = global.tradeUsersTwo.reduce((accumulator, currentValue) => {
            return accumulator += currentValue.tradeAmount;
        }, 0);

        const profitsInfoUpUsers = BetCalculator.calculateProfitForPlayers(upUsers, totalDownAmount);
        const profitsInfoDownUsers = BetCalculator.calculateProfitForPlayers(downUsers, totalUpAmount);

        this.io.emit('trader_list_15', {
            up_array: upUsers,
            down_array: downUsers,
            total_count: global.tradeUsersTwo.length,
            up_total: totalUpAmount,
            down_total: totalDownAmount,
            total_trade: totalTrade,
            up_return_percentage: profitsInfoUpUsers,
            down_return_percentage: profitsInfoDownUsers,
        });
    }


    @SubscribeMessage('chatMessage')
    handleChatMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: ChatHistory) {
        this.chat_history.push(payload);
        this.io.emit('newMessage', payload);
    }

    @SubscribeMessage('game_runner')
    gameRunner(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        console.log("log event")
        if (this.io) this.io.emit('newGame', data);
    }

    @SubscribeMessage('game-activity-report')
    async handleGameActivityReport(@MessageBody() data: IGameActivityReport, @ConnectedSocket() client: Socket) {
        try {

            const allTimePlayersCount = await this.orderRepository.getDistinctDocumentCount('walletId', { isDeleted: false });

            const gamesList = await this.gameCurrentRepo.getGamesHistoryListing(data);

            let result = {
                livePlayersCount: this.connectedUsersCount,
                allTimePlayersCount,
                gamesHistory: gamesList?.docs || [],
                totalGamesHistoryPages: gamesList?.totalPages || 0,
                totalGamesHistoryCurrentPage: gamesList?.page || 0,
                // gamesHistory: [],
                // totalGamesHistoryPages: 0,
                // totalGamesHistoryCurrentPage: 0, 
            }

            // let result = {
            //     livePlayersCount: 0,
            //     allTimePlayersCount: 0,
            //     gamesHistory: [],
            //     totalGamesHistoryPages: 0,
            //     totalGamesHistoryCurrentPage: 0, 
            // }



            this.io.emit('game-activity-report', result);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @SubscribeMessage('live-users-count')
    async handleLiveUsersCount(@ConnectedSocket() client?: Socket) {
        try {
            let response = {
                livePlayersCount: this.connectedUsersCount
            }

            this.io.emit('live-users-count', response);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    @SubscribeMessage('user-ticket-activity-report')
    async handleUserTicketActivityReport(@MessageBody() data: IUserTicketActivity, @ConnectedSocket() client?: Socket) {
        try {
            const ticketsActivity = await this.ticketHelper.handleAchievementPercentageCalculation(data.walletId);
            this.io.emit('user-ticket-activity-report-' + data.walletId, ticketsActivity);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /* Emit a event to frontend for requesting to refresh the current balance */
    async handleRefreshBalance(walletId: string, flag: boolean) {
        try {
            this.io.emit('user-balance-' + walletId, { refreshBalance: true, walletId: walletId, flag });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}

