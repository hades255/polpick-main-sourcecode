import { Injectable, Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import _ from "underscore";
import { randomUUID } from "crypto";
import { GameCurrentRepository } from 'src/game/repository/game-current.repository';
import { ConfigService } from '@nestjs/config';
import { ContractService } from 'src/contract/contract.service';
// const WEB3 = require('./contractObject')
const ethers = require("ethers")
const contractABI = require("../../raw/contractABI.json");



@Injectable()
export class HelperService {
  // private readonly logger = new Logger(RunningGameService.name);
  private gameInterval: NodeJS.Timer
  private startTime: number;
  private endTime: number;
  private startPrice: number;
  private endPrice: number;
  private phase: "Trade" | "Mining";
  private total: number;
  // const SEPOLIA_RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/GAn7aE1NUDxV1JSxE18RgbP67Z8CZadH';
  private POLYGON_RPC_URL: string;
  private privateKey: string;
  private provider: string;
  private wallet: string;
  private contractAddress: string;
  private contract: any;
  private poolIDTest: string;
  private GAME_TYPE: string;
  private POOL_ID: string;
  constructor(
    private gameCurrentRepo: GameCurrentRepository,
    configService: ConfigService,
    private readonly contractService: ContractService

  ) {

    // // this.startGameInterval();
    // const SEPOLIA_RPC_URL = configService.get('SEPOLIA_RPC_URL')
    // // this.POLYGON_RPC_URL = 'https://polygon-amoy.g.alchemy.com/v2/WHFEVkRb6oHhjIR96kIknPKnH_yGVDol';
    // // this.POLYGON_RPC_URL = configService.get('POLYGON_RPC_URL');
    // this.privateKey = configService.get('PRIVATE_KEY');
    // // this.provider = new ethers.JsonRpcProvider(this.POLYGON_RPC_URL);
    // this.provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
    // this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    // this.contractAddress = configService.get('CONTRACT_ADDRESS');
    // this.contract = new ethers.Contract(this.contractAddress, contractABI, this.wallet);
    // this.GAME_TYPE = "30";

    // this.contract = contractService.contract
  }

  async startGame(type: any) {
    try {
      //  const checkRunningGameStats = await runningGame()
      console.log("contract", this.contractAddress)
      const checkRunningGameStats = await this.contract.isRunning()
      console.log("Running Status ", checkRunningGameStats)
      let gameType = type 
      if (checkRunningGameStats) {

        if (gameType === "30") {
          console.log("Game Type " , gameType)
          const poolId = ethers.encodeBytes32String(randomUUID().substring(0, 8))
          // const poolId = '0x3135373331363832000000000000000000000000000000000000000000000000'
          await this.startGameStatus()
          const poolObj = {
            id: poolId,
            minBetAmount: "10000000000000000",
            maxBetAmount: "50000000000000000000",
            poolBetsLimitVal: 20
          }
          console.log("poolObj", poolObj)

          let poolHash = await this.createGamePool(poolObj)
          console.log("Pool Hash ", poolObj)

          if (poolHash) {
            const getPool = await this.contract.pools(poolObj.id)
            console.log("Get Pool", getPool)

            if (getPool) {
      
              const timeMS = 0; //current time
              const tradesStartTimeMs = Math.floor(Date.now() / 1000);
              console.log("tradesStartTimeSeconds:", tradesStartTimeMs);

              const tradesEndTimeMs = tradesStartTimeMs + 30; // end time
              console.log(poolObj.id,
                timeMS,
                tradesStartTimeMs,
                tradesEndTimeMs,
                // price,
                20,);
              const price = 0;
              const batchSize = 10;

              const triggerTx = await this.contract.trigger(
                // this.poolIDTest,
                poolId,
                timeMS,
                tradesStartTimeMs,
                tradesEndTimeMs,
                price,
                20,
              );

              await triggerTx.wait()
              const triggerObj = {
                gameId: randomUUID().substring(0, 8),
                poolId: poolId,
                gameType: "30",
                gameTimeStart: tradesStartTimeMs,
                gameTimeEnd: tradesEndTimeMs,
                batchSize
              }
        
              await this.gameCurrentRepo.currentGameCreate(triggerObj)
    
              return triggerTx
            }

          }

        } else if (gameType === "15") {
          //game 13 create pool
          console.log("gameType",gameType)

          await this.startGameStatus()
          const poolId = ethers.encodeBytes32String(randomUUID().substring(0, 8))
          // const poolId = '0x3135373331363832000000000000000000000000000000000000000000000000'
          const poolObj = {
            id: poolId,
            minBetAmount: "5000000000000000",
            maxBetAmount: "50000000000000000000",
            poolBetsLimitVal: 20
          }
          console.log("poolObj", poolObj)

          let poolHash = await this.createGamePool(poolObj)
          console.log("Pool Hash ", poolHash)

          if (poolHash) {
            const getPool = await this.contract.pools(poolObj.id)
            console.log("Get Pool", getPool)

            if (getPool) {
    
              const timeMS = 0; //current time
              const tradesStartTimeMs = Math.floor(Date.now() / 1000);
              console.log("tradesStartTimeSeconds:", tradesStartTimeMs);

              const tradesEndTimeMs = tradesStartTimeMs + 30; // end time
              console.log(poolObj.id,
                timeMS,
                tradesStartTimeMs,
                tradesEndTimeMs,
                // price,
                20,);
              const price = 0;
              const batchSize = 10;

              const triggerTx = await this.contract.trigger(
                // this.poolIDTest,
                poolId,
                timeMS,
                tradesStartTimeMs,
                tradesEndTimeMs,
                0,
                20,
              );

              await triggerTx.wait()
              const triggerObj = {
                gameId: randomUUID().substring(0, 8),
                poolId: poolId,
                gameType: "15",
                gameTimeStart: tradesStartTimeMs,
                gameTimeEnd: tradesEndTimeMs,
                batchSize
              }
        
           let gameAdded =    await this.gameCurrentRepo.currentGameCreate(triggerObj)
    
              return gameAdded
            }

          }
        }
      }
      else {
        await this.startGameStatus()
        return { message: "Game Already Running" }
      }




    }
    catch (error) {
      console.log("POOLERROR0949 ", error)
      return error
    }
  }


  async startGameStatus() {
    try {

      const startGameStat = await this.contract.startGame();
      console.log("Start Game ", startGameStat)
    }
    catch (error) {
      console.log("Error", error)
      return error
    }
  }

  async createGamePool(poolObj: any) {
    try {
      const createPoolTx = await this.contract.createPool(poolObj.id, poolObj.minBetAmount, poolObj.maxBetAmount, poolObj.poolBetsLimitVal);
      console.log('Create Pool Transaction Hash:', createPoolTx);
      await createPoolTx.wait()
      return createPoolTx

    }
    catch (error) {
      console.log("Error")
    }
  }


  async stopGame(message) {
    try {
      const checkRunningGameStats = await this.contract.isRunning()
      console.log("Running Status ", checkRunningGameStats)

      console.log("StopGame")
      if (checkRunningGameStats) {
        const val = ethers.encodeBytes32String("Stop Game")
        const stop = await this.contract.stopGame(val)
        console.log("Game Stopped")
        return { message: "Game Stopped" }
      } else {
        return { message: "No Game Currently Running!" }
      }
    }
    catch (error) {
      console.log("ERRSTOPGAME049")
      return error
    }
  }
  async getFeeAddress() {
    try {
      const checkRunningGameStats = await this.contract.feeAddress()
      console.log("Get Fee Address", checkRunningGameStats)
      return checkRunningGameStats
    }
    catch (error) {
      console.log("ERRORFEEADDRESS049")
      return error
    }
  }

  async getFeeJackpotAddress() {
    try {
      console.log("Get Fee Jackpot Address")

      const getFeeJackpotAddr = await this.contract.feeJackpotAddress()
      console.log("Get Jackpot Address", getFeeJackpotAddr)
      return getFeeJackpotAddr
    }
    catch (error) {
      console.log("ERRORJACKPOTADDR", error)
    }
  }
  async getFeeJackpotPercentage() {
    try {
      console.log("Get Fee Jackpot Address")

      const getJackpotFeePercent = await this.contract.feeJackpotAddress()
      console.log("Get Jackpot Address", getJackpotFeePercent)
      return getJackpotFeePercent
    }
    catch (error) {
      console.log("ERRORJACKPOTADDR", error)
    }
  }
  async getFeePercentage() {
    try {
      console.log("getFeePercentage")

      const feePercentage = await this.contract.feePercentage()
      console.log("Get Fee Percentage", feePercentage)
      return feePercentage
    }
    catch (error) {
      console.log("ERRFEEPERCT", error)
    }
  }
  async getGameControllerAddress() {
    try {
      console.log("getGameControllerAddress")

      const getControllerAddress = await this.contract.gameController()
      console.log("Get Controller Address", getControllerAddress)
      return getControllerAddress
    }
    catch (error) {
      console.log("ERRCONTROLADDR", error)
    }

  }

  async getContractBalance() {
    try {
      console.log("Get Contract Balance")

      const getContractBal = await this.contract.getContractBalance()
      console.log("Get Contract Balance", getContractBal)
      return getContractBal
    }
    catch (error) {
      console.log("ERRCONTRBAL", error)
    }

  }
  async setNotRunningContractReason(data: String) {
    try {
      console.log("setNotRunningContractReason")
      let reason = ethers.encodeBytes32String(data)
      const setReason = await this.contract.notRunning(reason) //bytes
      console.log("Set Running Contract Reason", setReason)
      return setReason //bytes
    }
    catch (error) {
      console.log("ERRCONTRBAL", error)
    }

  }

  async changeGameControllerAddress(address: String) {
    try {
      const changeAddress = await this.contract.changeGameControllerAddress(address) // wallet Address
      console.log("Changed Wallet Address", changeAddress)
      return changeAddress
    }
    catch (error) {
      console.log("ERRORCONTRADDR099", error)
    }
  }

  async changeGameFeeAddress(address: String) {
    try {
      const changeAddress = await this.contract.changeGameFeeAddress(address) // wallet Address
      console.log("Changed Game Fee Address", changeAddress)
      return changeAddress
    }
    catch (error) {
      console.log("ERRORGAMEFEEADDRESS0949", error)
    }
  }
  async changeGameFeeJackpotAddress(address: String) {
    try {
      const changeAddress = await this.contract.changeGameFeeJackpotAddress(address) // wallet Address
      console.log("Change Game Fee Jackpot Address", changeAddress)
      return changeAddress
    }
    catch (error) {
      console.log("ERRORJACKPOT044", error)
    }
  }
  async changeGameFeeJackpotPercentage(value: Number) {
    try {
      const changeAddress = await this.contract.changeGameFeeJackpotPercentage(value) // value percentage 
      console.log("Change Game Fee Percentage", changeAddress)
      return changeAddress
    }
    catch (error) {
      console.log("ERRORJACKPOT044", error)
    }
  }
  async changeGameFeePercentage(value: Number) {
    try {
      const changeAddress = await this.contract.changeGameFeePercentage(value) // value percentage 
      console.log("Change Game Fee Percentage", changeAddress)
      return changeAddress
    }
    catch (error) {
      console.log("ERRORJACKPOT044", error)
    }
  }
  async transferOwnership(address: String) {
    try {
      const changeAddress = await this.contract.transferOwnership(address) // value percentage 
      console.log("Change Ownership Address", changeAddress)
      return changeAddress
    }
    catch (error) {
      console.log("ERRORJACKPOT044", error)
    }
  }






}
