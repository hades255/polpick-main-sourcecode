import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Contract, ethers } from "ethers";
import { SocketGateway } from "src/websocket/websocket.gateway";
import { OrdersRepository } from "src/order/repository/order.repository";
import { UserRepository } from "src/users/repositories/users.repository";
import { BetCalculator } from "src/helpers/bet-calculator.helper";
import { GameCurrentRepository } from "src/game/repository/game-current.repository";
import BigNumber from "bignumber.js";
import { TicketHelper } from "src/helpers/ticket.helper";
import { faker } from "@faker-js/faker";
import { ConfigService } from '@nestjs/config';
import * as ContractABI from '../../raw/contractABI.json';


@Injectable()
export class ContractService implements OnModuleInit {
    constructor(
        @Inject('EthersContract30') readonly contract30: Contract,
        @Inject('EthersContract15') readonly contract15: Contract,
        private readonly socketGateway: SocketGateway,
        private readonly orderRepository: OrdersRepository,
        private readonly gameCurrentRepository: GameCurrentRepository,
        private readonly userRepository: UserRepository,
        private readonly ticketHelper: TicketHelper,
        private readonly configService: ConfigService

    ) { }

    async onModuleInit() {
        /* Listen to contract events */
        this.subscribeEvents30();
        this.subscribeEvents15();
    }

    //For Game 30
    subscribeEvents30(): void {
        // TradePlaced
        this.contract30.on("TradePlaced", async (
            poolId: string,
            sender: string,
            amount: bigint,
            prediction: string,
            newTotal: number,
            indexedPoolId: string,
            indexedSender: string,
            avatarUrl: string,
            referralLink: string, // countryCode -> to referral code
            roundStartTime: number,
            whiteLabelId: string,
            gameId: string
        ) => {

            this.socketGateway.handleRefreshBalance(sender, false);


            console.log(`TradePlaced Log:`, {
                poolId,
                sender,
                amount,
                prediction,
                newTotal,
                indexedPoolId,
                indexedSender,
                avatarUrl,
                referralLink, // countryCode -> to referral code
                roundStartTime,
                whiteLabelId,
                gameId
            });

            try {
                /* Save order information */
                const tradeAmount = BigNumber(amount as any).toNumber() / Math.pow(10, 18);

                let userInfo = await this.userRepository.getByField({ walletId: sender, isDeleted: false });
                if (!userInfo?._id) {
                    // console.error("Trade user not found!");
                    let userObj = {
                        walletId: sender,
                        lastWalletConnected: new Date(),
                        lastOnline: new Date(),
                        profile_image: faker.image.avatar(),
                        username: faker.person.fullName()
                    }
                    userInfo = await this.userRepository.save(userObj);
                }

                const isAffiliateUser = userInfo?.referral_link?.trim() ? true : false;
                const deductionsData = new BetCalculator(tradeAmount, isAffiliateUser).calculateDeductions();

                const gameInfo = await this.gameCurrentRepository.getByFieldLatest({ "poolId": poolId });
                if (!gameInfo?._id) {
                    console.error('Error: ', 'Game Info Not Found With PoolID: ', poolId);
                }

                const tradeOrderData = {
                    affiliate_link: userInfo?.referral_link,
                    referrerWalletId: userInfo?.referrerWalletId,
                    poolId,
                    gameId: gameInfo?._id?.toString(),
                    betFor: prediction.toLowerCase(),
                    upOrDown: prediction == 'UP' ? true : false,
                    avatarUrl: userInfo?.profile_image || '',
                    countryCode: userInfo?.country || '',
                    gameType: gameInfo?.gameType,
                    tradeAmount: tradeAmount,
                    walletId: sender,
                    whiteLabelId: whiteLabelId,
                    netTradeAmount: deductionsData.netTradeAmount
                };
                let saveOrder: any;

                if (tradeOrderData && deductionsData) {
                    saveOrder = await this.orderRepository.save({ ...tradeOrderData, ...deductionsData, status: 'complete' });
                }



                // try {
                //     let bet = await this.contract30.pools("0x33303a3331");

                //     console.log(bet, "betbetbetbetbetbetbetbetbetbetbetbet Test...")

                //     console.log(bet[6][1][0], "bet Test...")

                //     let defaultBotAddress = [
                //         'efc062dcb3de04dcf49db5343c56195036bdb29c075c7adc2b122c18810843aa',
                //         '3d5fb5c35e439448f28e62cf5308240f3a45349788c438b1b85e90b09968037e'
                //     ];

                //     let botPublicKeys = [];

                //     const rpcUrl = this.configService.get("DEDICATED_BASE_RPC_URL");
                //     const provider = new ethers.JsonRpcProvider(rpcUrl);

                //     defaultBotAddress.map(data => {
                //         console.log(data, "dataaaaaaaaaaaaaaa")
                //         // const wallet = new ethers.Wallet(data, provider);
                //         const wallet = new ethers.Wallet(data, provider);
                //         console.log(wallet.address, "walletwalletwallet")
                //         botPublicKeys.push(wallet.address)
                //     })

                //     console.log(botPublicKeys, "botPublicKeysbotPublicKeysbotPublicKeys")

                //     console.log(bet[6][1][0], "bet[6][1][0]bet[6][1][0]bet[6][1][0]bet[6][1][0]")

                //     let isMatch = false;

                //     if (bet[6][1][0]) {
                //         isMatch = defaultBotAddress.includes(bet[6][1][0]);
                //     }

                //     if (bet[7][1][0]) {
                //         isMatch = defaultBotAddress.includes(bet[7][1][0]);
                //     }

                //     if (isMatch) {

                //         let botData = await this.initializeBotsForRealUsers(
                //             gameId,
                //             poolId,
                //             prediction == 'UP' ? true : false
                //         );

                //         console.log(botData, "botDatabotDatabotData for real user...");
                //     }

                // } catch (err: any) {
                //     console.log("Error bot initialization", err)
                // }

                if (poolId == '0x33303a3330') {
                    /* Handle Game30 User Save */
                    global.tradeUsers.push({ order_id: saveOrder?._id, ...tradeOrderData });
                    this.socketGateway.handleTraderList();
                } else {
                    /* Handle Game15 User Save */
                    global.tradeUsersTwo.push({ order_id: saveOrder?._id, ...tradeOrderData });
                    this.socketGateway.handleTraderListTwo();
                }

                /* Calculate Tickets Based On Bets */
                this.ticketHelper.handleBetPlaced({
                    type: 'bet',
                    walletId: sender,
                    winningStatus: false
                })

                this.socketGateway.handleRefreshBalance(sender, false);
            } catch (error) {
                console.error(error);
            }
        });



        // GameStarted
        this.contract30.on("GameStarted", (log: any) => {
            console.log(`GameStarted Log:`, log);
        })

        // RoundStarted
        this.contract30.on("RoundStarted", (log: any) => {
            global.botEncounter = 0;
            console.log(`RoundStarted Log: ${new Date().toLocaleString()}:`, log);
        })


        // RoundStarted
        this.contract30.on("RoundDistributed", (poolId, returnGroupUpBetsLength, fromReturnUp, returnGroupUpDistributedCount, timeMS) => {
            console.log(`RoundDistributed Log: ${new Date().toLocaleString()}:`, poolId, returnGroupUpBetsLength, fromReturnUp, returnGroupUpDistributedCount, timeMS);
        })

        // TradeWinningsSent
        this.contract30.on("TradeWinningsSent", async (poolId, winnersAddress, winnersBets, winnings, addresses, whiteLabelIds, feePercentage, feeJackpotPercentage) => {
            console.log("Trade Winning ", poolId, winnersAddress, winnersBets, winnings, addresses, whiteLabelIds, feePercentage, feeJackpotPercentage);
            this.socketGateway.handleRefreshBalance(winnersAddress, true);
        })
    }

    //For Game 15
    subscribeEvents15(): void {
        // TradePlaced
        this.contract15.on("TradePlaced", async (
            poolId: string,
            sender: string,
            amount: bigint,
            prediction: string,
            newTotal: number,
            indexedPoolId: string,
            indexedSender: string,
            avatarUrl: string,
            referralLink: string, // countryCode -> to referral code
            roundStartTime: number,
            whiteLabelId: string,
            gameId: string
        ) => {

            this.socketGateway.handleRefreshBalance(sender, false);


            console.log(`TradePlaced Log:`, {
                poolId,
                sender,
                amount,
                prediction,
                newTotal,
                indexedPoolId,
                indexedSender,
                avatarUrl,
                referralLink, // countryCode -> to referral code
                roundStartTime,
                whiteLabelId,
                gameId
            });

            try {
                /* Save order information */
                const tradeAmount = BigNumber(amount as any).toNumber() / Math.pow(10, 18);

                let userInfo = await this.userRepository.getByField({ walletId: sender, isDeleted: false });
                if (!userInfo?._id) {
                    // console.error("Trade user not found!");
                    let userObj = {
                        walletId: sender,
                        lastWalletConnected: new Date(),
                        lastOnline: new Date(),
                        profile_image: faker.image.avatar(),
                        username: faker.person.fullName()
                    }
                    userInfo = await this.userRepository.save(userObj);

                }

                const isAffiliateUser = userInfo?.referral_link?.trim() ? true : false;
                const deductionsData = new BetCalculator(tradeAmount, isAffiliateUser).calculateDeductions();

                const gameInfo = await this.gameCurrentRepository.getByFieldLatest({ "poolId": poolId });
                if (!gameInfo?._id) {
                    console.error('Error: ', 'Game Info Not Found With PoolID: ', poolId);
                }

                const tradeOrderData = {
                    affiliate_link: userInfo?.referral_link,
                    referrerWalletId: userInfo?.referrerWalletId,
                    poolId,
                    gameId: gameInfo?._id?.toString(),
                    betFor: prediction.toLowerCase(),
                    upOrDown: prediction == 'UP' ? true : false,
                    avatarUrl: userInfo?.profile_image || '',
                    countryCode: userInfo?.country || '',
                    gameType: gameInfo?.gameType,
                    tradeAmount: tradeAmount,
                    walletId: sender,
                    whiteLabelId: whiteLabelId,
                    netTradeAmount: deductionsData.netTradeAmount
                };

                let saveOrder: any;
                if (tradeOrderData && deductionsData) {
                    saveOrder = await this.orderRepository.save({ ...tradeOrderData, ...deductionsData, status: 'complete' });
                }


                // try {
                //     await this.initializeBotsForRealUsers15(gameId, poolId, tradeOrderData.upOrDown)
                // } catch (err: any) {
                //     console.log("Error bot initialization", err)
                // }

                if (poolId == '0x33303a3330') {
                    /* Handle Game30 User Save */
                    global.tradeUsers.push({ order_id: saveOrder?._id, ...tradeOrderData });
                    this.socketGateway.handleTraderList();
                } else {
                    /* Handle Game15 User Save */
                    global.tradeUsersTwo.push({ order_id: saveOrder?._id, ...tradeOrderData });
                    this.socketGateway.handleTraderListTwo();
                }

                /* Calculate Tickets Based On Bets */
                this.ticketHelper.handleBetPlaced({
                    type: 'bet',
                    walletId: sender,
                    winningStatus: false
                })

                this.socketGateway.handleRefreshBalance(sender, false);
            } catch (error) {
                console.error(error);
            }
        });



        // GameStarted
        this.contract15.on("GameStarted", (log: any) => {
            console.log(`GameStarted Log:`, log);
        })

        // RoundStarted
        this.contract15.on("RoundStarted", (log: any) => {
            global.botEncounter = 0;
            console.log(`RoundStarted Log: ${new Date().toLocaleString()}:`, log);
        })


        // RoundStarted
        this.contract15.on("RoundDistributed", (poolId, returnGroupUpBetsLength, fromReturnUp, returnGroupUpDistributedCount, timeMS) => {
            console.log(`RoundDistributed Log: ${new Date().toLocaleString()}:`, poolId, returnGroupUpBetsLength, fromReturnUp, returnGroupUpDistributedCount, timeMS);
        })

        // TradeWinningsSent
        this.contract15.on("TradeWinningsSent", async (poolId, winnersAddress, winnersBets, winnings, addresses, whiteLabelIds, feePercentage, feeJackpotPercentage) => {
            console.log("Trade Winning ", poolId, winnersAddress, winnersBets, winnings, addresses, whiteLabelIds, feePercentage, feeJackpotPercentage);
            this.socketGateway.handleRefreshBalance(winnersAddress, true);
        })
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




    async initializeBotsForRealUsers15(gameId: string, poolId: string, userPrediction: boolean): Promise<any> {
        try {

            let botUsersArray = [];
            let txnArray = [];

            let accountsPrivateKeys = process.env.CONDITIONAL_BOT.split(',');

            if (accountsPrivateKeys.length - 1 === global.botEncounter) {
                return;
            }

            const botUser = {
                poolId: poolId,
                avatarUrl: faker.image.avatar(),
                countryCode: faker.location.countryCode(),
                upOrDown: !userPrediction,
                whiteLabelId: faker.finance.ethereumAddress(),
                gameId: gameId,
            };

            botUsersArray.push(botUser);

            try {
                const contract = this.getContract15(accountsPrivateKeys[++global.botEncounter - 1]);
                console.log(contract, "contractcontractcontract, conditional");

                const tx = await contract.makeTrade(
                    {
                        poolId: botUser.poolId,
                        avatarUrl: botUser.avatarUrl,
                        countryCode: botUser.countryCode,
                        upOrDown: botUser.upOrDown,
                        whiteLabelId: botUser.whiteLabelId,
                        gameId: botUser.gameId,
                    }, { value: ethers.parseEther('0.000002') }
                )
                await tx.wait();

                txnArray.push(tx?.hash || botUser.whiteLabelId);
            } catch (error) {
                console.error('TxError:', error?.message);
            }

            return { success: true, data: { txnArray, botUsersArray }, message: 'Bots Initialized Successfully.' };
        } catch (error) {
            throw new Error(error)
            // throw new InternalServerErrorException(error.message);
        }
    }
}


