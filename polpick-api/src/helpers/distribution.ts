import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import * as ethers from 'ethers';
import * as dotenv from 'dotenv';
import { CronJob } from 'cron';

dotenv.config();

// const contractABI = require('../../raw/contractABI.json');
// const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; //sepolia
// const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
// const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);
// List of addresses to send transactions from
const addressList = [
    { address: '0xA1C861165a4e41aD216BEcAfC147BEb74164B799', amount: ethers.parseEther('0.02') },
    { address: '0x9A1F47aE5094Ed0aB442F4054Af5eA082DFA7DA5', amount: ethers.parseEther('0.03') },
  ];

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {
    this.configureCronJob();
  }

  private configureCronJob() {
    const job = new CronJob(CronExpression.EVERY_DAY_AT_MIDNIGHT, () => {
    //   this.sendTransactionsFromAddresses();
    }, null, true, 'UTC');
  
    this.schedulerRegistry.addCronJob('sendTransactions', job);
    job.start();
  }

//   @Cron(CronExpression.EVERY_HOUR, {})
  async sendTransactionsFromAddresses() {
    for (const { address, amount } of addressList) {
        console.log("address",address)

      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, global.PROVIDER);
      const signer = wallet.connect(global.PROVIDER);

      // Replace with the desired recipient address and amount
      const recipientAddress = wallet.address;
    //   const amount = ethers.parseEther('0.01');

    //   console.log("Send Transaction",wallet.address)

      try {
        const tx = await signer.sendTransaction({
          to: address,
          value: amount,
        });
        console.log("tx",tx)
        this.logger.log(`Transaction sent from ${address}: ${tx.hash}`);
      return tx.hash
      } catch (error) {
        this.logger.error(`Error sending transaction from ${address}: ${error}`);
      }
    }
  }
}