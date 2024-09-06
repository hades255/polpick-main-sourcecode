import { GameCurrentModel } from "../db/schema/game-current";
const BigNumber = require('bignumber.js');
import { findAndUpdateGame, saveGame } from "../controller/gameController";
import { randomUUID } from 'crypto';
import axios from "axios";
import { addTriggerQueueTwo } from "../helper/queue15";
import mongoose, { Types } from "mongoose";
import OrderRepository from "../db/repositories/order";
import BettingHelper from "../helper/bet-calculator";
import moment from 'moment';
import { getContractTwo } from "../helper/contract";
import { IGameObject, endPriceInterface, startPriceInterface } from "../interface/Game";


export class RunningGameFifteen {
    private startTime: any;
    private endTime: any;
    private secondsElapsed = 0;
    private gameData: any;
    private interval: NodeJS.Timeout | null = null;
    private isDistributionCompleted: boolean = true;


    constructor() { }

    async game15(io: any) {
        try {
            const ENABLE_TRIGGER = true; // Set "true" to enable place bets
            const POOL_ID = process.env.FIFTEEN_POOL_ID;
            // const POOL_ID = process.env.TEST_POOL_ID;
            let phase = "TradeStart";
            let prevEndPrice = 0;
            let start_price: number = 0;
            let end_price: number = 0;
            let bak_start_price: number = 0;
            let bak_end_price: number = 0;
            this.secondsElapsed = 0;


            let tempGameObjData: IGameObject = {
                "seconds": 30 - this.secondsElapsed,
                "phase": "TradeStart",
                "totalTime": 30,
                "endPrice": 0,
                "startPrice": 0,
                "startTime": this.startTime,
                "endTime": this.endTime,
                "game_id": "",
                "poolId": POOL_ID
            }

            let frontendStartPriceObj: startPriceInterface = { start_price: 0, game_id: '' };
            let frontendEndPriceObj: endPriceInterface = { end_price: 0, game_id: '' };

            /* Listen Socket Events For Frontend Price */
            io.on('connection', async (socket: any) => {
                socket.on("start_price15", async (data: startPriceInterface) => {
                    try {
                        console.log(`Get btc start price from frontend:`)
                        frontendStartPriceObj = data;
                    } catch (error) {
                        console.error('ErrorBtcPriceFrontendEvent:', error);
                    }
                });

                socket.on("endPrice_price15", async (data: endPriceInterface) => {
                    try {
                        console.log(`Get btc end price from frontend:`)
                        frontendEndPriceObj = data;
                    } catch (error) {
                        console.error('ErrorBtcPriceFrontendEvent:', error);
                    }
                });
            })

            /* Listen Round Ended Event To End The Current Game Progress */
            getContractTwo().on('RoundDistributed', (poolId, returnGroupUpBetsLength, fromReturnUp, returnGroupUpDistributedCount, timeMS) => {
                if (poolId === POOL_ID) {
                    this.isDistributionCompleted = true;
                }
            })
            let isRunning = await getContractTwo().isRunning()
            console.log("isRunning", isRunning)
            /* Check If Game Correctly Ended Or Not */
            console.log("contractStatus", tempGameObjData.poolId)
            let contractStatus = await getContractTwo().pools(tempGameObjData.poolId);

            if (ENABLE_TRIGGER && contractStatus?.length && Number(contractStatus[1]) != 0) {
                this.isDistributionCompleted = false;

                /* Trigger end if game not ended properly */
                console.log(`Trigger To Reset Game: ${contractStatus[1]}`);
                prevEndPrice = prevEndPrice ? prevEndPrice : (globalThis as any).btcPrice;
                addTriggerQueueTwo(tempGameObjData.poolId, 0, new BigNumber(prevEndPrice).multipliedBy(10 ** 4).toFixed(0), 20, 'RESET_GAME');
            }

            this.interval = setInterval(async () => {

                console.log({ isDistributionCompleted: this.isDistributionCompleted, secondsElapsed: this.secondsElapsed, type: 15 })
                /* Stop execution until the distribution event is received from contract events */
                if (!this.isDistributionCompleted) {
                    return;
                } else if (this.secondsElapsed == 0) {
                    this.startTime = (Math.floor(Date.now() / 1000) + 1);
                    this.endTime = Math.floor(Date.now() / 1000) + 46;
                    tempGameObjData['startTime'] = this.startTime;
                    tempGameObjData['endTime'] = this.endTime;
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;
                    tempGameObjData['phase'] = "TradeStart";
                    phase = "TradeStart";

                    let gameData = await saveGame({
                        gameId: randomUUID().substring(0, 8),
                        gameType: "15",
                        gameTimeStart: this.startTime,
                        gameTimeEnd: this.endTime,
                        poolId: tempGameObjData.poolId
                    });

                    if (gameData && gameData.status == 200) {
                        this.gameData = gameData.data;
                        tempGameObjData['game_id'] = this.gameData._id.toString();
                        io.emit("newGame", tempGameObjData);
                        io.emit("progress", { leftSecond: 30, totalSecond: 50 })
                    } else {
                        console.log('Failed to create new game 15 retrying...')
                        return;
                    }

                    /* Clear & Reset Current Game Users Listing */
                    try {
                        await axios.get(process.env.POLPICK_ADMIN_URL + `/api/game/reset-game/${tempGameObjData.poolId}`);
                    } catch (error) {
                        console.error((error as any)?.message);
                    }


                    try {
                        await OrderRepository.getWeeklyJackpotAmount().then(result => {
                            let statsData: any = {
                                // totalJackpotAmount: parseFloat(result).toFixed(4),
                                totalJackpotAmount: parseFloat(result),
                                endTime: moment().utc().endOf('week').unix(),
                                currentTime: moment().utc().unix(),
                            };

                            console.log(statsData, "statsDatastatsDatastatsDatastatsData")

                            io.emit("jackpot_prize", statsData);
                        })
                    } catch (error) {
                        console.error((error as any)?.message)
                    }

                    /* Trigger Contract 1 */
                    // addTriggerQueue(tempGameObjData.poolId, 0, 0, 20);
                } else if (this.secondsElapsed == 4) {
                    /* Trigger Bots */
                    console.log((globalThis as any).enableBotsFifteen, "(globalThis as any).enableBotsFifteen(globalThis as any).enableBotsFifteen(globalThis as any).enableBotsFifteen")
                    if ((globalThis as any).enableBotsFifteen) {
                        console.log('15: Enabled Bots.....')
                        axios.get(process.env.POLPICK_ADMIN_URL + `/api/game/initialize-bots-15/${tempGameObjData['game_id']}/${POOL_ID}`)
                            .then(response => {
                                console.log('All Bets Successful.')
                            })
                            .catch(error => {
                                console.error((error as any)?.message);
                            });
                    }
                } else if (this.secondsElapsed == 31) {
                    tempGameObjData["phase"] = "MiningStart";
                    phase = "MiningStart";
                    // tempGameObjData['game_id'] = this.gameData._id.toString();
                    tempGameObjData["seconds"] = 45 - this.secondsElapsed;
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;
                    io.emit("newGame", tempGameObjData);

                    /* Set Backup Price Value */
                    bak_start_price = (globalThis as any).btcPrice;
                } else if (this.secondsElapsed == 32) {
                    /* Set BTC Start Price */
                    if (frontendStartPriceObj?.start_price != 0 && frontendStartPriceObj?.game_id) {
                        console.log(`15: Set Frontend Start Price: ${frontendStartPriceObj.start_price}`);
                        start_price = frontendStartPriceObj.start_price;

                        /* Trigger Contract 2 (Mining Start) */
                        let contractStatus = await getContractTwo().pools(tempGameObjData.poolId);
                        if (ENABLE_TRIGGER && contractStatus?.length && Number(contractStatus[1]) == 0) {
                            /* Trigger end if game not ended properly */
                            addTriggerQueueTwo(tempGameObjData.poolId, 0, new BigNumber(start_price).multipliedBy(10 ** 4).toFixed(0), 20, 'START_GAME');
                        }

                        await findAndUpdateGame(frontendStartPriceObj);
                    } else {
                        console.log(`15: Set Backup Start Price: ${bak_start_price}`);
                        start_price = bak_start_price;

                        /* Trigger Contract 2 (Mining Start) */
                        let contractStatus = await getContractTwo().pools(tempGameObjData.poolId);
                        if (ENABLE_TRIGGER && contractStatus?.length && Number(contractStatus[1]) == 0) {
                            /* Trigger end if game not ended properly */
                            addTriggerQueueTwo(tempGameObjData.poolId, 0, new BigNumber(start_price).multipliedBy(10 ** 4).toFixed(0), 20, 'START_GAME');
                        }

                        await findAndUpdateGame({ game_id: tempGameObjData.game_id, start_price });
                    }

                    /* Reset the frontend start data object */
                    frontendEndPriceObj = { game_id: '', end_price: 0 };
                } else if (this.secondsElapsed == 45) {
                    tempGameObjData['phase'] = 'MiningEnd';
                    phase = "MiningEnd";
                    // tempGameObjData['game_id'] = this.gameData._id.toString();
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;
                    io.emit("newGame", tempGameObjData);

                    /* Set Backup End Price Value */
                    bak_end_price = (globalThis as any).btcPrice;
                } else if (this.secondsElapsed == 46) {
                    /* Set BTC End Price */
                    if (frontendEndPriceObj?.end_price != 0 && frontendEndPriceObj?.game_id) {
                        console.log(`15: Set Frontend End Price: ${frontendEndPriceObj.end_price}`);
                        end_price = frontendEndPriceObj.end_price;

                        /* Trigger Contract 3 */
                        let contractStatus = await getContractTwo().pools(tempGameObjData.poolId);
                        if (ENABLE_TRIGGER && contractStatus?.length && Number(contractStatus[1]) != 0) {
                            /* Set to false to wait the timer until this value is updated by the contract event from RoundDistributed */
                            this.isDistributionCompleted = false;
                            addTriggerQueueTwo(tempGameObjData.poolId, 0, new BigNumber(end_price).multipliedBy(10 ** 4).toFixed(0), 20, 'END_GAME');
                        }

                        await findAndUpdateGame(frontendEndPriceObj);
                    } else {
                        console.log(`15: Set Backup End Price: ${bak_end_price}`);
                        end_price = bak_end_price;

                        /* Trigger Contract 3 */
                        let contractStatus = await getContractTwo().pools(tempGameObjData.poolId);
                        if (ENABLE_TRIGGER && contractStatus?.length && Number(contractStatus[1]) != 0) {
                            /* Set to false to wait the timer until this value is updated by the contract event from RoundDistributed */
                            this.isDistributionCompleted = false;
                            addTriggerQueueTwo(tempGameObjData.poolId, 0, new BigNumber(end_price).multipliedBy(10 ** 4).toFixed(0), 20, 'END_GAME');
                        }

                        await findAndUpdateGame({ game_id: tempGameObjData.game_id, end_price: end_price });
                    }

                    /* Reset the frontend end data object */
                    frontendStartPriceObj = { game_id: '', start_price: 0 };
                    /* Set for resetting the game with the games original end price */
                    prevEndPrice = end_price;

                    tempGameObjData['phase'] = "distribution";
                    phase = "distribution";
                    // tempGameObjData['game_id'] = this.gameData._id.toString();
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;

                    /* Send Distribution Event To Frontend */
                    io.emit('newGame', {
                        totalTime: 5, phase: "distribution", startTime: "",
                        endTime: "", endPrice: "", startPrice: ""
                    });


                    /* Handle Distribution Event */
                    const [gameUpUsersData, gameDownUsersData] = await Promise.all([
                        OrderRepository.getOrderDetail({
                            gameId: new Types.ObjectId(tempGameObjData.game_id),
                            betFor: 'up',
                            status: 'complete'
                        }),
                        OrderRepository.getOrderDetail({
                            gameId: new Types.ObjectId(tempGameObjData.game_id),
                            betFor: 'down',
                            status: 'complete'
                        })
                    ])

                    // Calculate the net amounts bet on each side
                    const totalNetUpBets = gameUpUsersData.reduce((prev, curr) => prev += BettingHelper.calculateNetBetAmount(curr.tradeAmount), 0);
                    const totalNetDownBets = gameDownUsersData.reduce((prev, curr) => prev += BettingHelper.calculateNetBetAmount(curr.tradeAmount), 0);

                    // Assuming down side wins
                    const totalReturnsForDownSide = BettingHelper.calculateTotalReturns(gameDownUsersData, totalNetUpBets);
                    const totalReturnsForUpSide = BettingHelper.calculateTotalReturns(gameUpUsersData, totalNetDownBets);

                    const upOrDown = tempGameObjData.endPrice > tempGameObjData.startPrice;
                    let isDraw = tempGameObjData.endPrice == tempGameObjData.startPrice;

                    console.log({ tmpStartPrice: tempGameObjData.startPrice, tmpEndPrice: tempGameObjData.endPrice });
                    if (!gameUpUsersData.length || !gameDownUsersData.length) {
                        isDraw = true;
                        console.log({ ifConditionResult: 'Not enough users on both side!' })
                    }

                    /* Emit game winner distribution information */
                    io.emit('winner15', {
                        gameId: tempGameObjData.game_id,
                        upOrDown: isDraw ? 'draw' : upOrDown ? 'up' : 'down',
                        endPrice: tempGameObjData.endPrice,
                        startPrice: tempGameObjData.startPrice,
                        totalUpUsers: gameUpUsersData.length,
                        totalDownUsers: gameDownUsersData.length,
                        totalUpAmount: totalNetUpBets,
                        totalDownAmount: totalNetDownBets,
                        users: isDraw ? [] : upOrDown ? totalReturnsForUpSide : totalReturnsForDownSide,
                        totalReturnsForDownSide: totalReturnsForDownSide,
                        totalReturnsForUpSide: totalReturnsForUpSide,
                    });

                    await GameCurrentModel.updateOne({ _id: new mongoose.Types.ObjectId(tempGameObjData.game_id) }, { winnerStatus: isDraw ? 'draw' : upOrDown ? 'up' : 'down' });

                    try {
                        await axios.post(process.env.POLPICK_ADMIN_URL + `/api/game/game-result`, {
                            gameId: tempGameObjData.game_id,
                            up_user_array: totalReturnsForDownSide,
                            down_user_array: totalReturnsForUpSide,
                            result: isDraw ? 'draw' : upOrDown ? 'up' : 'down',
                        }, { headers: { 'x-access-token': '' } });
                    } catch (error) {
                        console.error((error as any)?.message);
                    }
                }


                if (this.secondsElapsed != 50) {
                    let leftSecond = 30;
                    if (this.secondsElapsed > 0 && this.secondsElapsed < 31) {
                        leftSecond = 30 - this.secondsElapsed;
                    } else if (this.secondsElapsed > 30 && this.secondsElapsed < 46) {
                        leftSecond = 45 - this.secondsElapsed;
                    } else if (this.secondsElapsed > 45 && this.secondsElapsed < 51) {
                        leftSecond = 50 - this.secondsElapsed;
                    };

                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;

                    /* Emit Frontend Realtime Game Progress */
                    io.emit("progress", { leftSecond: leftSecond, totalSecond: 50, phase: phase, start_price, end_price });

                    // console.log({ ...tempGameObjData, leftSecond });

                    this.secondsElapsed++;
                } else {
                    this.secondsElapsed = 0;
                    start_price = 0;
                    end_price = 0;
                    bak_start_price = 0;
                    bak_end_price = 0;

                    frontendStartPriceObj = { game_id: '', start_price: 0 };
                    frontendEndPriceObj = { game_id: '', end_price: 0 };
                }

                let poolStatus = await getContractTwo().pools(tempGameObjData.poolId);
                console.log('15', { time: ` [${new Date().toLocaleString()}] `, phase: tempGameObjData?.phase, start_price, end_price, poolStartPrice: poolStatus[1], poolEndPrice: poolStatus[2] });

                (globalThis as any).GAME_OBJECT_DATA_15 = tempGameObjData;
            }, 1000); // Run the game tick every second
        } catch (err) {
            return err;
        }
    }

}


