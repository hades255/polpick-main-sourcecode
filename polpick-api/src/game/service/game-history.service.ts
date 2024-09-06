import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import * as _ from 'underscore';
import { ApiResponseType } from 'src/common/types/api-response.type';
import { GameHistoryRepository } from '../repository/game-history.repository';
import { HelperService } from 'src/helpers/game.helper';
import { GameCurrentRepository } from '../repository/game-current.repository';
import { GameListPaginatedDto, GameResultDto, WinRatioListDto, WinRationById } from '../dto/dto.game';
import { SocketGateway } from 'src/websocket/websocket.gateway';
import { OrdersRepository } from 'src/order/repository/order.repository';
import { TicketHelper } from 'src/helpers/ticket.helper';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { Contract, ethers } from "ethers";
import * as ContractABI from '../../../raw/contractABI.json';
import { faker } from "@faker-js/faker";
import BigNumber from 'bignumber.js';
import { SettingRepository } from 'src/setting/repositories';


@Injectable()
export class GameService {
    constructor(
        private readonly gameHistoryRepository: GameHistoryRepository,
        private readonly gameCurrentRepo: GameCurrentRepository,
        private readonly helperService: HelperService,
        private readonly socketGateway: SocketGateway,
        private readonly ordersRepository: OrdersRepository,
        private readonly ticketHelper: TicketHelper,
        private readonly configService: ConfigService,
        private readonly settingsRepo: SettingRepository
    ) { }

    async resetGame(poolId: string): Promise<ApiResponseType> {
        try {
            if (poolId == '0x33303a3330') {
                global.tradeUsers = [];
                this.socketGateway.handleTraderList();
            } else {
                global.tradeUsersTwo = [];
                this.socketGateway.handleTraderListTwo();
            }

            return { success: true, message: "Game cleared successfully.", data: {} };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async handleGameResult(body: GameResultDto): Promise<ApiResponseType> {
        try {
            if (body.result !== 'draw') {
                if (Array.isArray(body.down_user_array)) {
                    body.down_user_array.forEach((dnUser) => {
                        this.ticketHelper.handleBetPlaced({
                            type: 'result',
                            walletId: dnUser.walletId,
                            winningStatus: body?.result == 'down',
                            orderId: dnUser.orderId,
                            totalReturn: dnUser.totalReturn,
                        })
                    })
                }

                if (Array.isArray(body.up_user_array)) {
                    body.up_user_array.forEach((upUser) => {
                        this.ticketHelper.handleBetPlaced({
                            type: 'result',
                            walletId: upUser.walletId,
                            winningStatus: body?.result == 'up',
                            orderId: upUser.orderId,
                            totalReturn: upUser.totalReturn,
                        })
                    })
                }
            }

            return { success: true, message: "Game result saved successfully.", data: {} };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async listGameHistory(gameListPaginatedDto: GameListPaginatedDto): Promise<ApiResponseType> {
        try {
            const allTimePlayersCount = await this.ordersRepository.getDistinctDocumentCount('walletId', { isDeleted: false });
            const gamesList = await this.gameCurrentRepo.getGamesHistoryListing(gameListPaginatedDto);

            return {
                success: true,
                message: 'Games history fetched successfully.',
                data: gamesList.docs,
                limit: gamesList.limit,
                page: gamesList.page,
                pages: gamesList.totalPages,
                total: gamesList.totalDocs,
                all_time_players_count: allTimePlayersCount
            };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getBySlug(slug: string): Promise<ApiResponseType> {
        try {
            const data = await this.gameHistoryRepository.getByFieldWithProjection({ slug: slug, isDeleted: false }, { _id: 0, title: 1, content: 1, image: 1 });
            if (data) return { success: true, message: "CMS fetched successfully!", data };
            return { success: false, message: "No such page found!", data: null };
        } catch (error) {
            return { success: false, message: error.message, data: null };
        }
    };

    /* For Dashboard Sidebar Recent Winners Listing */
    async recentWinnersListing(game: string): Promise<ApiResponseType> {
        try {
            let filterQuery = { gameType: '15' }
            if (game == '30') {
                filterQuery['gameType'] = '30';
            }

            const records = await this.gameCurrentRepo.getRecentWinnersListing(filterQuery);



            return { success: true, message: "Recent winners data fetched successfully.", data: records };
        } catch (error) {
            return { success: false, message: error.message, data: [] };
        }
    };

    /* For dashboard Sidebar Recent Top 5 Winners */
    async recentTopFiveWinners(game: string): Promise<ApiResponseType> {
        try {
            let filterQuery = { gameType: '15' };
            if (game == '30') {
                filterQuery['gameType'] = '30';
            }

            const records = await this.gameCurrentRepo.getRecentTopFiveListing(filterQuery);

            return { success: true, message: "Recent top 5 winners fetched successfully.", data: records };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: null };

        }
    }


    /* For Fetching The Daily Win Ratio Listing And Their Ticket Prizes Amount */
    async getWinRatioListing(listingDto: WinRatioListDto): Promise<ApiResponseType> {
        try {
            let userRankingData: any = {
                rank: 0,
                totalTradesCount: 0,
                winRatio: 0,
                endTime: moment().utc().endOf('day').unix(),
                currentTime: moment().utc().unix(),
            };

            const winRatioData = await this.ordersRepository.getWinRatioListing(listingDto);

            if (listingDto.walletId) {
                const foundUser = winRatioData.find(val => val.walletId === listingDto.walletId);
                if (foundUser) {
                    userRankingData = {
                        rank: foundUser.rank,
                        totalTradesCount: foundUser.totalTradesCount,
                        winRatio: foundUser.winRatio,
                        endTime: moment().utc().endOf('day').unix(),
                        currentTime: moment().utc().unix(),
                    };
                }
            }

            return { success: true, data: winRatioData, user_data: userRankingData, message: "Win ratio listing fetched successfully." };
        } catch (error) {
            throw new InternalServerErrorException(error.message);

        }
    }


    /******************************* Contract Api Service Methods *******************************/
    async start(type): Promise<any> {
        try {
            const data = await this.helperService.startGame(type)
            if (data) {
                return { success: true, type: 'success', message: "Game started", data: data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }

    async stop(message: string): Promise<any> {
        try {
            const data = await this.helperService.stopGame(message);
            if (data) {
                return { success: true, type: 'success', message: "Game started", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async getFeeAddress(): Promise<any> {
        try {
            const data = await this.helperService.getFeeAddress();
            if (data) {
                return { success: true, type: 'success', message: "Fee Address", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async getFeeJackpotAddress(): Promise<any> {
        try {
            const data = await this.helperService.getFeeJackpotAddress();
            if (data) {
                return { success: true, type: 'success', message: "Jackpot Fee Address", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async getFeeJackpotPercentage(): Promise<any> {
        try {
            const data = await this.helperService.getFeeJackpotPercentage();
            if (data) {
                return { success: true, type: 'success', message: "Fee Jackpot Percentage", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async getFeePercentage(): Promise<any> {
        try {
            const data = await this.helperService.getFeePercentage();
            if (data) {
                return { success: true, type: 'success', message: "Fee Jackpot Percentage", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async getGameControllerAddress(): Promise<any> {
        try {
            const data = await this.helperService.getGameControllerAddress();
            if (data) {
                return { success: true, type: 'success', message: "Get Controller Address", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async getContractBalance(): Promise<any> {
        try {
            const data = await this.helperService.getContractBalance();
            if (data) {
                return { success: true, type: 'success', message: "Get Contract Balance", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async setNotRunningContractReason(message: String): Promise<any> {
        try {
            const data = await this.helperService.setNotRunningContractReason(message);
            if (data) {
                return { success: true, type: 'success', message: "Set Not Running Contract Reason", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }

    async changeGameControllerAddress(address: String): Promise<any> {
        try {
            const changeGameControlAddress = await this.helperService.changeGameControllerAddress(address);
            if (changeGameControlAddress) {
                return { success: true, type: 'success', message: "Game Controller Address Changed", changeGameControlAddress }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }

    async changeGameFeeAddress(address: String): Promise<any> {
        try {
            const data = await this.helperService.changeGameFeeAddress(address);
            if (data) {
                return { success: true, type: 'success', message: "Get Controller Address", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async changeGameFeeJackpotAddress(address: String): Promise<any> {
        try {
            const data = await this.helperService.changeGameFeeJackpotAddress(address);
            if (data) {
                return { success: true, type: 'success', message: "Change Game Fee Address Change", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async changeGameFeeJackpotPercentage(value: Number): Promise<any> {
        try {
            const data = await this.helperService.changeGameFeeJackpotPercentage(value);
            if (data) {
                return { success: true, type: 'success', message: "Change Game Fee Address Change", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async changeGameFeePercentage(value: Number): Promise<any> {
        try {
            const data = await this.helperService.changeGameFeePercentage(value);
            if (data) {
                return { success: true, type: 'success', message: "Change Game Fee Address Change", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async transferOwnership(address: String): Promise<any> {
        try {
            const data = await this.helperService.transferOwnership(address);
            if (data) {
                return { success: true, type: 'success', message: "Transfer Ownership", data }
            }
            return { success: false, type: 'error', message: "Nothing found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] };
        }
    }


    async createGame(data: any): Promise<ApiResponseType> {
        try {
            const create = await this.gameCurrentRepo.currentGameCreate(data)

            if (create) return { success: true, type: 'success', message: "Game History Created ", data: create };
            return { success: false, type: 'error', message: "No such page found!", data: null };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] }
        }
    }

    async findGame(data: any): Promise<any> {
        try {
            const result = await this.gameCurrentRepo.findGame(data)
            if (result) {
                return { success: true, type: 'success', message: "Find Game", data: result }
            }

            return { success: false, type: 'error', message: "No Data found!", data: [] };
        } catch (error) {
            return { success: false, type: 'error', message: error.message, data: [] }
        }
    }


    // Function to get a random integer between min (inclusive) and max (exclusive)
    async getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    async initializeBots30(gameId: string, poolId: string): Promise<ApiResponseType> {
        try {

            let botUsersArray = [];
            let txnArray = [];

            let settingData = await this.settingsRepo.getByField({
                isDeleted: false
            });

            let accountsPrivateKeys = process.env.DEFAULT_BOT.split(',')

            // console.log(accountsPrivateKeys, "accountsPrivateKeysaccountsPrivateKeysaccountsPrivateKeys")

            // Randomly select private keys and store them in randomAcctPvtKeys
            const randomAcctPvtKeys = [];
            // const numberOfKeys = accountsPrivateKeys.length; // Number of keys you want to randomly select

            let minKeys = settingData.minAmountOfBotPerGame30;
            let maxKeys = settingData.maxBotPerGame30;

            const numberOfKeys = Math.min(Math.max(accountsPrivateKeys.length, minKeys), maxKeys); // Ensure numberOfKeys is within range


            // console.log(numberOfKeys, "numberOfKeysnumberOfKeysnumberOfKeysnumberOfKeys")
            const selectedIndices = new Set();

            while (selectedIndices.size < numberOfKeys) {
                const randomIndex = await this.getRandomInt(0, accountsPrivateKeys.length);
                if (!selectedIndices.has(randomIndex)) {
                    selectedIndices.add(randomIndex);
                    randomAcctPvtKeys.push(accountsPrivateKeys[randomIndex]);
                }
            }

            // console.log(randomAcctPvtKeys, "randomAcctPvtKeysrandomAcctPvtKeysrandomAcctPvtKeysrandomAcctPvtKeysrandomAcctPvtKeys")

            // const upOrDownValues = [true, false]

            const upOrDownValues = randomAcctPvtKeys.map(() => Math.random() >= 0.5);

            // console.log(upOrDownValues, "upOrDownValuesupOrDownValuesupOrDownValues")

            for (let i = 0; i < randomAcctPvtKeys.length; i++) {
                // console.log(accountsPrivateKeys[i], "accountsPrivateKeys[i]accountsPrivateKeys[i]accountsPrivateKeys[i]accountsPrivateKeys[i]");

                // let bal = new BigNumber((await provider.getBalance(accountsPrivateKeys[i])).toString()).div(Math.pow(10, 18));;
                // console.log(bal, "balbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbal");

                // const length = 2;  // Length of the array
                // const upOrDownValues = Array(10).fill(false).map((_, i) => i < 2);
                // const upOrDownValues = Array(length / 2).fill(true).concat(Array(length / 2).fill(false)).sort(() => Math.random() - 0.5);

                // console.log(upOrDownValues, "upOrDownValuesupOrDownValuesupOrDownValues");


                const botUser = {
                    poolId: poolId,
                    avatarUrl: faker.image.avatar(),
                    profile_image: faker.image.avatar(),
                    countryCode: faker.location.countryCode(),
                    upOrDown: upOrDownValues[i],
                    whiteLabelId: faker.finance.ethereumAddress(),
                    username: faker.person.fullName(),
                    gameId: gameId,
                };


                // console.log(botUser, "botUserbotUserbotUser", i, "iiiiiiiiii");

                botUsersArray.push(botUser);

                // console.log(botUsersArray, "botUsersArray");

                try {
                    const contract = this.getContract30(randomAcctPvtKeys[i]);
                    // console.log(contract, "Bot contractcontractcontract");



                    let avgBetAmountPerBot = settingData.avgBetAmountPerBot30;

                    // console.log(avgBetAmountPerBot, "avgBetAmountPerBotavgBetAmountPerBot")

                    const tx = await contract.makeTrade(
                        {
                            poolId: botUser.poolId,
                            avatarUrl: botUser.avatarUrl,
                            countryCode: botUser.countryCode,
                            upOrDown: botUser.upOrDown,
                            whiteLabelId: botUser.whiteLabelId,
                            gameId: botUser.gameId,
                        }, { value: ethers.parseEther(avgBetAmountPerBot.toString()) }
                    )
                    await tx.wait();
                    console.log(tx, "Bot txtxtxtxtxtxtxtx");

                    txnArray.push(tx?.hash || botUser.whiteLabelId);
                } catch (error) {
                    console.error('TxError:', error?.message);
                }
                // console.log("Transaction Hash Make Trade", tx.hash);
            }

            return { success: true, data: { txnArray, botUsersArray }, message: 'Bots Initialized Successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async initializeBots15(gameId: string, poolId: string): Promise<ApiResponseType> {
        try {

            let botUsersArray = [];
            let txnArray = [];

            let settingData = await this.settingsRepo.getByField({
                isDeleted: false
            });
            let accountsPrivateKeys = process.env.DEFAULT_BOT.split(',')
            const randomAcctPvtKeys = [];
            let minKeys = settingData.minAmountOfBotPerGame15;
            let maxKeys = settingData.maxBotPerGame15;
            const numberOfKeys = Math.min(Math.max(accountsPrivateKeys.length, minKeys), maxKeys); // Ensure numberOfKeys is within range
            const selectedIndices = new Set();
            while (selectedIndices.size < numberOfKeys) {
                const randomIndex = await this.getRandomInt(0, accountsPrivateKeys.length);
                if (!selectedIndices.has(randomIndex)) {
                    selectedIndices.add(randomIndex);
                    randomAcctPvtKeys.push(accountsPrivateKeys[randomIndex]);
                }
            }
            const upOrDownValues = randomAcctPvtKeys.map(() => Math.random() >= 0.5);

            for (let i = 0; i < upOrDownValues.length; i++) {
                // console.log(accountsPrivateKeys[i], "accountsPrivateKeys[i]accountsPrivateKeys[i]accountsPrivateKeys[i]accountsPrivateKeys[i]");

                // let bal = new BigNumber((await provider.getBalance(accountsPrivateKeys[i])).toString()).div(Math.pow(10, 18));;
                // console.log(bal, "balbalbalbalbalbalbalbalbalbalbalbalbalbalbalbalbal");

                // const length = 2;  // Length of the array
                // const upOrDownValues = Array(10).fill(false).map((_, i) => i < 2);
                // const upOrDownValues = Array(length / 2).fill(true).concat(Array(length / 2).fill(false)).sort(() => Math.random() - 0.5);

                // console.log(upOrDownValues, "upOrDownValuesupOrDownValuesupOrDownValues");


                const botUser = {
                    poolId: poolId,
                    profile_image: faker.image.avatar(),
                    avatarUrl: faker.image.avatar(),
                    countryCode: faker.location.countryCode(),
                    upOrDown: upOrDownValues[i],
                    whiteLabelId: faker.finance.ethereumAddress(),
                    username: faker.person.fullName(),
                    gameId: gameId,
                };


                // console.log(botUser, "botUserbotUserbotUser", i, "iiiiiiiiii");

                botUsersArray.push(botUser);

                // console.log(botUsersArray, "botUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArraybotUsersArray");

                try {
                    const contract = this.getContract15(randomAcctPvtKeys[i]);
                    // console.log(contract, "Bot contractcontractcontract");

                    let avgBetAmountPerBot = settingData.avgBetAmountPerBot15;


                    const tx = await contract.makeTrade(
                        {
                            poolId: botUser.poolId,
                            avatarUrl: botUser.avatarUrl,
                            countryCode: botUser.countryCode,
                            upOrDown: botUser.upOrDown,
                            whiteLabelId: botUser.whiteLabelId,
                            gameId: botUser.gameId,
                        }, { value: ethers.parseEther(avgBetAmountPerBot.toString()) }
                    )
                    await tx.wait();
                    // console.log(tx, "Bot txtxtxtxtxtxtxtx");

                    txnArray.push(tx?.hash || botUser.whiteLabelId);
                } catch (error) {
                    console.error('TxError: Bot', error?.message);
                }
                // console.log("Transaction Hash Make Trade", tx.hash);
            }

            return { success: true, data: { txnArray, botUsersArray }, message: 'Bots Initialized Successfully.' };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    getContract30(privateKey: string): Contract {
        const contractAddress = this.configService.get("CONTRACT_ADDRESS_30");
        const rpcUrl = this.configService.get("DEDICATED_BASE_RPC_URL");
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

        return contract;
    }


    getContract15(privateKey: string): Contract {
        const contractAddress = this.configService.get("CONTRACT_ADDRESS_15");
        const rpcUrl = this.configService.get("DEDICATED_BASE_RPC_URL");
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);
        const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

        return contract;
    }


    async callTriggerFn(): Promise<ApiResponseType> {
        try {
            const startTime = performance.now();

            const TEST_POOL_ID = '0x12';
            const RPC_URL = this.configService.get("DEDICATED_BASE_RPC_URL");
            const PRIVATE_KEY = this.configService.get("PRIVATE_KEY");
            const contractAddress = this.configService.get("CONTRACT_ADDRESS");

            const provider = new ethers.JsonRpcProvider(RPC_URL);
            const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            const contract = new ethers.Contract(contractAddress, ContractABI, wallet);

            const getFeesData = await provider.getFeeData();
            let maxGasFeeLimit = Number(getFeesData.maxFeePerGas);
            let maxGasFeePriority = Number(getFeesData.maxPriorityFeePerGas);

            const triggerTx = await contract.trigger(TEST_POOL_ID, 0, new BigNumber(65000).multipliedBy(10 ** 4).toFixed(0), 20, {
                maxPriorityFeePerGas: new BigNumber(maxGasFeePriority).multipliedBy(1.5).toFixed(0),
                maxFeePerGas: new BigNumber(maxGasFeeLimit).multipliedBy(1.5).toFixed(0)
            });

            await triggerTx.wait();

            const endTime = performance.now();
            const timeTaken = endTime - startTime;

            return { success: true, data: triggerTx, total_time: timeTaken, message: `Contract pool with id '${TEST_POOL_ID}' trigger successful.` };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
