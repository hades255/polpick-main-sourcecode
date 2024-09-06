import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import * as _ from "underscore";
import { ApiResponseType } from "src/common/types/api-response.type";
import { OrdersRepository } from "../repository/order.repository";
import { OrderTransactionListDto } from "../dto/order.dto";
import { Cron } from "@nestjs/schedule";
import * as ethers from "ethers";
import { TicketRepository } from "src/tickets/repository/tickets.repository";
import { UserRepository } from "src/users/repositories/users.repository";
import { JackpotHistoryRepository } from "src/jackpot-history/repository/jackpot-history.repository";
import * as moment from 'moment';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly ticketRepository: TicketRepository,
    private readonly userRepository: UserRepository,
    private readonly jackpotHistoryRepo: JackpotHistoryRepository
  ) { }

  /* Get user trade transactions history with stats data */
  async transactionHistory(listDto: OrderTransactionListDto): Promise<ApiResponseType> {
    try {
      const userInfo = await this.userRepository.getByField({ walletId: listDto.walletId, isDeleted: false });
      if (!userInfo?._id) return { success: false, message: "User not found!", data: [] };

      const highestWinningData = await this.orderRepository.getUserHighestWinningData(listDto.walletId);

      const userStatsData = { highestWinStreak: userInfo?.winStreakCount, totalNumberOfWins: userInfo?.winningCount, highestWinning: highestWinningData };
      const transactionsList = await this.orderRepository.getTransactionHistory(listDto);

      return {
        success: true,
        message: "User transaction history fetched successfully.",
        data: transactionsList.docs,
        limit: transactionsList.limit,
        page: transactionsList.page,
        pages: transactionsList.totalPages,
        total: transactionsList.totalDocs,
        user_data: userStatsData
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Distribute the total Referral Earnings to the user wallet address by every day at 11:50 PM.
  @Cron("50 23 * * *")
  async handleReferralEarnings() {
    console.log("dsfkgjnskfgnskdan")
    this.logger.log("This runs every day at 11:50 PM");
    try {
      const transactions = await this.orderRepository.referralEarnings();
      if (!_.isEmpty(transactions)) {
        for (const transaction of transactions) {
          const wallet = new ethers.Wallet(
            process.env.PRIVATE_KEY,
            global.PROVIDER
          );
          const signer = wallet.connect(global.PROVIDER);
          try {
            const tx = await signer.sendTransaction({
              to: transaction.referrerWalletId,
              value: ethers.parseEther(transaction.totalReferralEarning),
            });
            console.log("tx", tx);
            console.log("Transaction hash", tx.hash);
            this.logger.log(
              `Transaction sent from ${wallet.address} to  ${transaction.referrerWalletId}`
            );
          } catch (error) {
            this.logger.error(
              `Error sending transaction from ${wallet.address}: ${error}`
            );
          }
        }
      } else {
        this.logger.log("No Data found");
      }
    } catch (error) {
      this.logger.error(`Error sending transaction : ${error.message}`);
    }
  }

  // Insert the ticket as per win ratio by every day at 11:50 PM.
  @Cron("39 18 * * *")
  async handleWinRatioCronData() {
    this.logger.log("This runs every day at 11:50 PM");
    try {
      const resp = await this.orderRepository.winRatioCronData();
      // console.log(resp, "received data");

      if (!_.isEmpty(resp)) {
        for (const item of resp) {
          // insert the ticket as per the win ratio
          const payload = {
            walletId: item.walletId,
            tickets: item.prizeAmount,
            type: "winRatio",
            date: new Date(),
          };
          this.ticketRepository.save(payload);
        }
        this.logger.log("All Ticket saved successfully");
      } else {
        this.logger.log("No Data found");
      }
    } catch (error) {
      this.logger.error(`Error ticket insert : ${error.message}`);
    }
  }

  // Insert the ticket as per win ratio by every day at 11:50 PM.
  @Cron("50 23 * * *")
  async handleHighRollerCronData() {
    this.logger.log("This runs every day at 11:50 PM");
    try {
      const resp = await this.orderRepository.highRollerCronData();
      console.log(resp, "received data");

      if (!_.isEmpty(resp)) {
        for (const item of resp) {
          // insert the ticket as per the win ratio
          const payload = {
            walletId: item.walletId,
            tickets: item.prizeAmount,
            type: "highRollerRatio",
            date: new Date(),
          };
          this.ticketRepository.save(payload);
        }
        this.logger.log("All Ticket saved successfully");
      } else {
        this.logger.log("No Data found");
      }
    } catch (error) {
      this.logger.error(`Error ticket insert : ${error.message}`);
    }
  }


  @Cron("55 23 * * *")
  async storeWeeklyJackpotWinners() {
    try {
      const totalJackpotAmount = await this.orderRepository.getWeeklyJackpotAmount();

      const firstPrize = totalJackpotAmount * 0.6; // 60%
      const secondPrize = totalJackpotAmount * 0.3; // 30%
      const thirdPrize = totalJackpotAmount * 0.1; // 10%
      const jackpotAmountArray = [firstPrize, secondPrize, thirdPrize];

      const ticketsData = await this.ticketRepository.getWeeklyJackpotList(jackpotAmountArray);
      const startDate = moment().startOf('isoWeek').add(1, 'day').toDate();
      const endDate = moment().endOf('isoWeek').toDate();

      // console.log(startDate, "startDatestartDatestartDate")
      // console.log(endDate, "endDateendDateendDate")


      ticketsData.map(async data => {
        

        data["week_start_date"] = startDate;
        data["week_end_date"] = endDate;

        
        delete data._id;
        console.log(data, "data")
        let save = await this.jackpotHistoryRepo.save(data);
        console.log(save, "saveeeeeeeeeeee")
      })

  
    } catch (error) {
      this.logger.error(`Error ticket insert : ${error.message}`);
    }
  }


}
