const BigNumber = require('bignumber.js');
import { findAndUpdateGame, saveGame } from "../controller/gameController";
import { randomUUID } from "crypto";
import { addTriggerQueue, trigger } from "../helper/queue30";
import { IGameObject, endPriceInterface, startPriceInterface } from "../interface/Game";
import axios from "axios";
import OrderRepository from '../db/repositories/order'
import BettingHelper from "../helper/bet-calculator";
import { GameCurrentModel } from "../db/schema/game-current";
import mongoose, { Types } from "mongoose";
import moment from 'moment';
import getContract from "../helper/contract";

export default class RunningGameThirty {
    private startTime: any
    private endTime: any
    private secondsElapsed = 0;
    private interval: NodeJS.Timeout | null = null;
    private gameData: any
    private isDistributionCompleted: boolean = true;

    constructor() { }

    async game30(io: any) {
        try {
            console.log("Hello");

            const POOL_ID = process.env.THIRTY_POOL_ID;
            // const POOL_ID = process.env.TEST_POOL_ID;
            let phase = "TradeStart";
            let prevEndPrice = 0;
            let start_price: number = 0;
            let end_price: number = 0;
            let bak_start_price: number = 0;
            let bak_end_price: number = 0;
            this.secondsElapsed = 0;

            console.log("Comes 386");


            // Initialize an object to store game data values
            let tempGameObjData: IGameObject = {
                "seconds": 30 - this.secondsElapsed, // Time left for the current phase
                "phase": "TradeStart", // Current phase of the game
                "totalTime": 30, // Total time for the trade phase
                "endPrice": 0, // End price of the asset at the end of the game
                "startPrice": 0, // Start price of the asset at the beginning of the game
                "startTime": this.startTime, // Start time of the game (timestamp)
                "endTime": this.endTime, // End time of the game (timestamp)
                "game_id": "", // Unique identifier for the game (to be set later)
                "poolId": POOL_ID, // Pool ID associated with the game
            };

            let frontendStartPriceObj: startPriceInterface = { start_price: 0, game_id: '' };
            let frontendEndPriceObj: endPriceInterface = { end_price: 0, game_id: '' };

            /* Listen Socket Events For Frontend Price */
            io.on('connection', async (socket: any) => {
                socket.on("start_price", async (data: startPriceInterface) => {
                    try {
                        console.log(`30: Get btc start price from frontend:`)
                        frontendStartPriceObj = data;
                    } catch (error) {
                        console.error('ErrorBtcPriceFrontendEvent:', error);
                    }
                });

                socket.on("endPrice_price", async (data: endPriceInterface) => {
                    try {
                        console.log(`30: Get btc end price from frontend:`)
                        frontendEndPriceObj = data;
                    } catch (error) {
                        console.error('ErrorBtcPriceFrontendEvent:', error);
                    }
                });
            })

            /* Listen Round Ended Event To End The Current Game Progress */
            getContract().on('RoundDistributed', (poolId, returnGroupUpBetsLength, fromReturnUp, returnGroupUpDistributedCount, timeMS) => {
                if (poolId === POOL_ID) {
                    this.isDistributionCompleted = true;
                }
            })

            console.log('aksjhdkjha')
            /* 
            * Check if the start price inside the contract is set to 0.
            * If not, it indicates that the end trigger has failed,
            * and a retrigger is required to close the previous game.
            */
            let contractStatus = await getContract().pools(tempGameObjData.poolId);

            console.log(contractStatus, 'contractStatus')
            if (contractStatus?.length && Number(contractStatus[1]) != 0) {
                this.isDistributionCompleted = false;

                /* Trigger end if game not ended properly */
                // console.log(`30: Trigger To Reset Game: ${contractStatus[1]}`);
                prevEndPrice = prevEndPrice ? prevEndPrice : (globalThis as any).btcPrice;
                addTriggerQueue(tempGameObjData.poolId, 0, new BigNumber(prevEndPrice).multipliedBy(10 ** 4).toFixed(0), 20, 'RESET_GAME');
            }

            /** 
             * Start Game 30 with interval and increment the "secondsElapsed" variable every second.
             * The interval will handle different phases of the game, such as TradeStart (0s), MiningStart (31s), and distribution (61s).
             */
            console.log('Hiiii')
            this.interval = setInterval(async () => {

                console.log({ isDistributionCompleted: this.isDistributionCompleted, secondsElapsed: this.secondsElapsed })

                /* Stop execution until the distribution event is received from  */
                if (!this.isDistributionCompleted) {
                    return;
                } else if (this.secondsElapsed == 0) {
                    /*
                    * TradeStart phase: This phase will create a new game, update the "tempGameObjData" object with the initial values,
                    * and send the game data to the frontend via the "newGame30" event. and the progress via "progress30" event
                    */
                    this.startTime = (Math.floor(Date.now() / 1000) + 1);
                    this.endTime = Math.floor(Date.now() / 1000) + 61;
                    tempGameObjData['startTime'] = this.startTime;
                    tempGameObjData['endTime'] = this.endTime;
                    tempGameObjData['phase'] = "TradeStart";
                    phase = "TradeStart";

                    let gameData = await saveGame({
                        gameId: randomUUID().substring(0, 8),
                        gameType: "30",
                        gameTimeStart: this.startTime,
                        gameTimeEnd: this.endTime,
                        poolId: tempGameObjData.poolId
                    });

                    if (gameData && gameData.status == 200) {

                        this.gameData = gameData.data;
                        tempGameObjData['game_id'] = this.gameData._id.toString();
                        tempGameObjData['startPrice'] = start_price;
                        tempGameObjData['endPrice'] = end_price;
                        io.emit("newGame30", tempGameObjData);
                        io.emit("progress30", { leftSecond: 30, totalSecond: 65 })
                    } else {
                        console.error('Failed to create new game 30 retrying...');
                        return;
                    }

                    /*
                    * Clear & Reset Current Game Users Listing:
                    * This will call the API to reset the game users listing for the given pool ID,
                    * ensuring that the user data from the previous game does not interfere with the new game.
                    */
                    try {
                        await axios.get(process.env.POLPICK_ADMIN_URL + `/api/game/reset-game/${tempGameObjData.poolId}`);
                    } catch (error) {
                        console.error((error as any)?.message);
                    }


                    /*
                    * Fetch and Emit Weekly Jackpot Amount:
                    * This retrieves the total weekly jackpot amount from the repository
                    * and emits this data to the clients via the "jackpot_prize" event. After every game ends the jackpot amount will increase.
                    */
                    try {
                        await OrderRepository.getWeeklyJackpotAmount().then(result => {
                            let statsData: any = {
                                // totalJackpotAmount: parseFloat(result).toFixed(4),
                                totalJackpotAmount: parseFloat(result),
                                endTime: moment().utc().endOf('week').unix(),
                                currentTime: moment().utc().unix(),
                            };

                            console.log(statsData, "statsDatastatsDatastatsDatastatsDatastatsData")

                            io.emit("jackpot_prize", statsData);
                        })
                    } catch (error) {
                        console.error((error as any)?.message)
                    }

                    /* Trigger Contract 1 */
                    // addTriggerQueue(tempGameObjData.poolId, 0, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000) + 30, 0, 20);
                    // await trigger(tempGameObjData.poolId, 0, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000) + 30, 0, 20);
                } else if (this.secondsElapsed == 4) {
                    /*
                    * Trigger Bots:
                    * If bot functionality is enabled globally, this block will log the activation of bots, 
                    * And the admin polpick server will execute the bot transactions.
                    */
                    if ((globalThis as any).enableBotsThirty) {
                        console.log('30: Enabled Bots.....')
                        axios.get(process.env.POLPICK_ADMIN_URL + `/api/game/initialize-bots-30/${tempGameObjData['game_id']}/${POOL_ID}`)
                            .then(response => {
                                console.log('All Bets Successful.')
                            })
                            .catch(error => {
                                console.error((error as any)?.message);
                            });
                    }
                } else if (this.secondsElapsed == 31) {
                    /*
                    * MiningStart phase: This phase will trigger the contract with the btc price got from the listener emitted by frontend, 
                    * update the "tempGameObjData" object with the initial values,
                    * and send the game data to the frontend via the "newGame30" event.
                    * 
                    * There is also the backup btc price which is taken from the btc trade websocket 
                    * and if any frontend fails to emit the btc price then the backup btc price will be used
                    */

                    tempGameObjData["phase"] = "MiningStart";
                    phase = "MiningStart"
                    // tempGameObjData['game_id'] = this.gameData._id.toString();
                    tempGameObjData["seconds"] = 60 - this.secondsElapsed;
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;
                    io.emit("newGame30", tempGameObjData)

                    bak_start_price = (globalThis as any).btcPrice;
                } else if (this.secondsElapsed == 32) {
                    /*
                    * Set BTC Price After 1Sec Of Frontend Emit:
                    * This block sets the start price for BTC if the socket data has not provided it
                    * assigns the backup start price to start_price,
                    * and checks the contract status. If the start price in the contract is still 0, it triggers the start of the game.
                    * Finally, it updates the game data with the start price.
                    */
                    if (frontendStartPriceObj?.start_price != 0 && frontendStartPriceObj?.game_id) {
                        console.log(`30: Set Frontend Start Price: ${frontendStartPriceObj.start_price}`);
                        start_price = frontendStartPriceObj.start_price;

                        /* Trigger Contract 2 (Mining Start) */
                        let contractStatus = await getContract().pools(tempGameObjData.poolId);
                        if (contractStatus?.length && Number(contractStatus[1]) == 0) {
                            /* Trigger end if game not ended properly */
                            addTriggerQueue(tempGameObjData.poolId, 0, new BigNumber(start_price).multipliedBy(10 ** 4).toFixed(0), 20, 'START_GAME');
                        }

                        await findAndUpdateGame(frontendStartPriceObj);
                    } else {
                        // console.log('Set backup btc start price.');
                        start_price = bak_start_price;

                        /* Trigger Contract 2 (Mining Start) */
                        let contractStatus = await getContract().pools(tempGameObjData.poolId);
                        if (contractStatus?.length && Number(contractStatus[1]) == 0) {
                            /* Trigger end if game not ended properly */
                            addTriggerQueue(tempGameObjData.poolId, 0, new BigNumber(start_price).multipliedBy(10 ** 4).toFixed(0), 20, 'START_GAME');
                        }

                        await findAndUpdateGame({ game_id: tempGameObjData.game_id, start_price });
                    }

                    /* Reset the frontend start data object */
                    frontendEndPriceObj = { game_id: '', end_price: 0 };
                } else if (this.secondsElapsed == 60) {
                    /*
                    * MiningEnd phase: This phase will trigger the contract with the btc price got from the listener emitted by frontend, 
                    * update the "tempGameObjData" object with the initial values,
                    * and send the game data to the frontend via the "newGame30" event.
                    */

                    tempGameObjData['phase'] = 'MiningEnd';
                    phase = "MiningEnd";
                    // tempGameObjData['game_id'] = this.gameData._id.toString();
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;
                    io.emit("newGame30", tempGameObjData);

                    bak_end_price = (globalThis as any).btcPrice;
                } else if (this.secondsElapsed == 61) {
                    /* Set BTC Price If Frontend Socket Data Was Not Found */
                    if (frontendEndPriceObj?.end_price != 0 && frontendEndPriceObj?.game_id) {
                        console.log(`15: Set Frontend End Price: ${frontendEndPriceObj.end_price}`);
                        end_price = frontendEndPriceObj.end_price;

                        /* Trigger Contract 3 */
                        let contractStatus = await getContract().pools(tempGameObjData.poolId);
                        if (contractStatus?.length && Number(contractStatus[1]) != 0) {
                            this.isDistributionCompleted = false;

                            /* Set to false to wait the timer until this value is updated by the contract event from RoundDistributed */
                            addTriggerQueue(tempGameObjData.poolId, 0, new BigNumber(end_price).multipliedBy(10 ** 4).toFixed(0), 20, 'END_GAME');
                        }

                        await findAndUpdateGame(frontendEndPriceObj);
                    } else {
                        // console.log('Set backup btc end price.');
                        end_price = bak_end_price;

                        /* Trigger Contract 3 (Mining End) */
                        let contractStatus = await getContract().pools(tempGameObjData.poolId);
                        if (contractStatus?.length && Number(contractStatus[1]) != 0) {
                            this.isDistributionCompleted = false;

                            /* Trigger Contract 3 */
                            addTriggerQueue(tempGameObjData.poolId, 0, new BigNumber(end_price).multipliedBy(10 ** 4).toFixed(0), 20, 'END_GAME');
                        }

                        await findAndUpdateGame({ game_id: tempGameObjData.game_id, end_price: end_price });
                    }

                    /* Reset the frontend end data object */
                    frontendStartPriceObj = { game_id: '', start_price: 0 };
                    /* Set for resetting the game with the games original end price */
                    prevEndPrice = end_price;

                    /* Update Game Object Data Accordingly */
                    tempGameObjData['phase'] = "distribution";
                    phase = "distribution";
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;
                    // tempGameObjData['game_id'] = this.gameData._id.toString();

                    /* Send Distribution Event To Frontend */
                    io.emit('newGame30', {
                        totalTime: 5, phase: "distribution", startTime: "",
                        endTime: "", endPrice: "", startPrice: ""
                    });


                    /**
                     * Handle Distribution Event:
                     * This will fetch the current games bet users from the db by up and down filters
                     */
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

                    /**
                     * Calculate the net amounts bet on each side:
                     * This will fetch the current games bet users from the db by up and down filters
                     */
                    const totalNetUpBets = gameUpUsersData.reduce((prev, curr) => prev += BettingHelper.calculateNetBetAmount(curr.tradeAmount), 0);
                    const totalNetDownBets = gameDownUsersData.reduce((prev, curr) => prev += BettingHelper.calculateNetBetAmount(curr.tradeAmount), 0);

                    /**
                     * Calculate Both Sides Winning Amounts:
                     */
                    const totalReturnsForDownSide = BettingHelper.calculateTotalReturns(gameDownUsersData, totalNetUpBets);
                    const totalReturnsForUpSide = BettingHelper.calculateTotalReturns(gameUpUsersData, totalNetDownBets);

                    /**
                     * Check Which Side Won By The Start Price And End Price Result:
                     */
                    const upOrDown = tempGameObjData.endPrice > tempGameObjData.startPrice;
                    let isDraw = tempGameObjData.endPrice == tempGameObjData.startPrice;

                    /**
                     * If Not Enough Players Have Bet On Both Sides Then The Game Result Will Be Set To Draw:
                     */
                    if (!gameUpUsersData.length || !gameDownUsersData.length) {
                        isDraw = true;
                    }

                    /*
                    * Emit Game Winner Distribution Information:
                    * This block emits an event to the frontend with detailed information about the game's outcome.
                    * It sends the game ID, the result (up, down, or draw), the start and end prices, the total number of users who bet up and down,
                    * the total amounts bet on both sides, and the list of users with their respective returns.
                    */
                    io.emit('winner30', {
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

                    /**
                     * Update The Game Winner Result:
                     */
                    await GameCurrentModel.updateOne({ _id: new mongoose.Types.ObjectId(tempGameObjData.game_id) }, { winnerStatus: isDraw ? 'draw' : upOrDown ? 'up' : 'down' });

                    /**
                     * Handle The Winning Users Ticket Distributions On The PolPick Admin Server By Calling A Api:
                     */
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


                /*
                * Update Real-time Game Progress:
                * This block calculates the remaining time and updates the real-time game progress on the frontend.
                * It determines the remaining time based on the current phase of the game (TradeStart, MiningStart, or distribution).
                * If the phase is TradeStart, it calculates the remaining time out of 30 seconds.
                * If the phase is MiningStart, it calculates the remaining time out of 60 seconds.
                * If the phase is Distribution, it calculates the remaining time out of 65 seconds.
                * It then emits the updated progress data to the frontend via the "progress30" event.
                */
                if (this.secondsElapsed != 66) {
                    let leftSecond = 30;
                    if (this.secondsElapsed > 0 && this.secondsElapsed < 31) {
                        leftSecond = 30 - this.secondsElapsed;
                    } else if (this.secondsElapsed > 30 && this.secondsElapsed < 61) {
                        leftSecond = 60 - this.secondsElapsed;
                    } else if (this.secondsElapsed > 60 && this.secondsElapsed < 66) {
                        leftSecond = 65 - this.secondsElapsed;
                    };

                    // tempGameObjData['game_id'] = this.gameData._id.toString();
                    tempGameObjData['startPrice'] = start_price;
                    tempGameObjData['endPrice'] = end_price;

                    /* Emit Frontend Realtime Game Progress Every Seconds */
                    io.emit("progress30", { leftSecond: leftSecond, totalSecond: 65, phase: phase, start_price, end_price });

                    // console.log({ ...tempGameObjData, leftSecond });

                    this.secondsElapsed++;
                } else {
                    // Reset game state when the timer reaches 66 seconds
                    this.secondsElapsed = 0;
                    start_price = 0;
                    end_price = 0;
                    bak_start_price = 0;
                    bak_end_price = 0;

                    frontendStartPriceObj = { game_id: '', start_price: 0 };
                    frontendEndPriceObj = { game_id: '', end_price: 0 };
                };

                // let poolStatus = await getContract().pools(tempGameObjData.poolId);
                // console.log('30', { time: this.secondsElapsed, phase: tempGameObjData?.phase, start_price, end_price, poolStartPrice: poolStatus[1], poolEndPrice: poolStatus[2] });

                /*
                * Set Current Game Object as Global Variable:
                * This block sets the current game object data into a global variable so that the frontend can access it.
                * It assigns the game object data to the global variable "GAME_OBJECT_DATA_30".
                * This allows clients who join the game midway to retrieve the current game object data by calling the request data event.
                */
                let poolStatus = await getContract().pools(tempGameObjData.poolId);
                console.log(poolStatus, "poolStatuspoolStatuspoolStatus");

                console.log('30', { time: ` [${new Date().toLocaleString()}] `, phase: tempGameObjData?.phase, start_price, end_price, poolStartPrice: poolStatus[1], poolEndPrice: poolStatus[2] });

                (globalThis as any).GAME_OBJECT_DATA_30 = tempGameObjData;
            }, 1000); // Run the game tick every second
        } catch (err: any) {
            return err;
        }
    }
}

