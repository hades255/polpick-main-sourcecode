import { InjectModel } from "@nestjs/mongoose";
import {
  AggregatePaginateModel,
  AggregatePaginateResult,
  FilterQuery,
  Model,
  PipelineStage,
} from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from "underscore";
import { BaseRepository } from "src/common/base/base.repository";
import { OrderDocument, Orders } from "../schemas/order.schema";
import * as moment from "moment";
import { HighRollerListDto } from "src/high-rollers/dto/high-rollers.dto";
import { WinRatioListDto } from "src/game/dto/dto.game";
import { OrderTransactionListDto } from "../dto/order.dto";

@Injectable()
export class OrdersRepository extends BaseRepository<OrderDocument> {
  constructor(
    @InjectModel(Orders.name) private OrderModel: Model<OrderDocument>,
    @InjectModel(Orders.name)
    private OrderModelPaginate: AggregatePaginateModel<OrderDocument>
  ) {
    super(OrderModel, OrderModelPaginate);
  }

  async getTransactionHistory(listDto: OrderTransactionListDto): Promise<AggregatePaginateResult<OrderDocument[]>> {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({ isDeleted: false, walletId: listDto.walletId });
      conditions["$and"] = and_clauses;

      /* Custom Field Sorting */
      let sortOperator: PipelineStage.Sort;
      if (listDto?.sort?.field && listDto?.sort?.order == 'asc') {
        sortOperator = { $sort: { [listDto?.sort?.field]: 1 } };
      } else if (listDto?.sort?.field && listDto?.sort?.order == 'desc') {
        sortOperator = { $sort: { [listDto?.sort?.field]: -1 } };
      } else {
        sortOperator = { $sort: { _id: -1 } };
      }

      const aggregate = this.OrderModel.aggregate([
        { $match: conditions },
        /* Lookup Game Data To Get Winning Status For Every Order */
        {
          $lookup: {
            from: "gamecurrents",
            let: { gameId: "$gameId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$gameId"] },
                      // { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "game_lookup_data",
          },
        },
        { $unwind: "$game_lookup_data" },
        {
          $addFields: {
            isTradeWon: { $eq: ["$game_lookup_data.winnerStatus", "$betFor"] },
          },
        },
        {
          $project: {
            _id: '$_id',
            tradeAmount: "$tradeAmount",
            tradeResult: "$isTradeWon",
            winningAmount: {
              $cond: [
                '$isTradeWon',
                '$winningAmount',
                0
              ]
            },
            profitAmount: {
              $cond: [
                '$isTradeWon',
                { $subtract: ['$winningAmount', '$tradeAmount'] },
                0
              ]
            },
            createdAt: '$createdAt',
          },
        },
        sortOperator
      ]);

      const options = { page: listDto.page, limit: listDto.limit };
      return await this.OrderModelPaginate.aggregatePaginate(aggregate, options);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /* For Fetching The Affiliate Manager Links And Their Earning Reports Etc. */
  async getTotalEarningsByReferralLink(
    filterQuery: FilterQuery<OrderDocument>
  ): Promise<OrderDocument[]> {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({ isDeleted: false });
      and_clauses.push(filterQuery);

      conditions["$and"] = and_clauses;

      const aggregate = await this.OrderModel.aggregate([
        // {
        //   $lookup: {
        //     from: "affiliatelinks",
        //     let: { affiliateLink: "$affiliate_link" },
        //     pipeline: [
        //       {
        //         $match: {
        //           $expr: {
        //             $and: [
        //               { $eq: ["$affiliate_link", "$$affiliateLink"] },
        //               { $eq: ["$isDeleted", false] },
        //             ],
        //           },
        //         },
        //       },
        //     ],
        //     as: "affiliate_link_lookup_data",
        //   },
        // },
        // { $unwind: "$affiliate_link_lookup_data" },
        { $match: conditions },
        {
          $project: {
            affiliate_link: "$affiliate_link",
            poolId: "$poolId",
            gameId: "$gameId",
            gameType: "$gameType",
            walletId: "$walletId",
            betFor: "$betFor",
            tradeAmount: "$tradeAmount",
            referralAmount: "$referralAmount",
            status: "$status",
            isDeleted: "$isDeleted",
            refferrerWalletId: "$refferrerWalletId",
          },
        },
      ]);

      return aggregate;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /* For Fetching The HighRoller Listing With Their Tickets Prizes Amount */
  async getHighRollerListing(listingDto: HighRollerListDto): Promise<
    {
      walletId: string;
      profile_image: string;
      country: string;
      totalTradeAmount: string;
      totalTurnOver: string;
      rank: string;
      totalUpBetsCount: string;
      totalDownBetsCount: string;
      upOrDown: string;
      prizeAmount: string;
    }[]
  > {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({
        isDeleted: false,
        createdAt: { $gte: new Date(moment().startOf("day").format()) },
      });

      conditions["$and"] = and_clauses;

      /* Custom Field Sorting */
      let sortOperator: PipelineStage.Sort;
      if (listingDto?.sort?.field && listingDto?.sort?.order == "asc") {
        sortOperator = { $sort: { [listingDto?.sort?.field]: 1 } };
      } else if (listingDto?.sort?.field && listingDto?.sort?.order == "desc") {
        sortOperator = { $sort: { [listingDto?.sort?.field]: -1 } };
      } else {
        sortOperator = { $sort: { totalTurnOver: -1 } };
      }

      const tradePrizes = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
      const aggregate = this.OrderModel.aggregate([
        { $match: conditions },
        {
          $group: {
            _id: "$walletId",
            totalTradeAmount: { $sum: "$tradeAmount" },
            totalTurnOver: { $sum: "$winningAmount" },
            betsForArray: { $push: "$betFor" },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userWalletId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$walletId", "$$userWalletId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "user_lookup_data",
          },
        },
        { $unwind: "$user_lookup_data" },
        {
          $addFields: {
            walletId: "$user_lookup_data.walletId",
            profile_image: "$user_lookup_data.profile_image",
            country: "$user_lookup_data.country",
            totalTradeAmount: "$totalTradeAmount",
            totalTurnOver: "$totalTurnOver",
            totalUpBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "up"] },
              },
            },
            totalDownBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "down"] },
              },
            },
          },
        },
        {
          $setWindowFields: {
            sortBy: { totalTurnOver: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $addFields: {
            prizeAmount: {
              $switch: {
                branches: [
                  { case: { $eq: ["$rank", 1] }, then: tradePrizes[0] },
                  { case: { $eq: ["$rank", 2] }, then: tradePrizes[1] },
                  { case: { $eq: ["$rank", 3] }, then: tradePrizes[2] },
                  { case: { $eq: ["$rank", 4] }, then: tradePrizes[3] },
                  { case: { $eq: ["$rank", 5] }, then: tradePrizes[4] },
                  { case: { $eq: ["$rank", 6] }, then: tradePrizes[5] },
                  { case: { $eq: ["$rank", 7] }, then: tradePrizes[6] },
                  { case: { $eq: ["$rank", 8] }, then: tradePrizes[7] },
                  { case: { $eq: ["$rank", 9] }, then: tradePrizes[8] },
                  { case: { $eq: ["$rank", 10] }, then: tradePrizes[9] },
                ],
                default: 0,
              },
            },
          },
        },
        {
          $addFields: {
            totalUpBetsCount: { $size: "$totalUpBets" },
            totalDownBetsCount: { $size: "$totalDownBets" },
          },
        },
        {
          $project: {
            walletId: "$walletId",
            profile_image: "$profile_image",
            country: "$country",
            totalTradeAmount: "$totalTradeAmount",
            totalTurnOver: "$totalTurnOver",
            rank: "$rank",
            totalUpBetsCount: "$totalUpBetsCount",
            totalDownBetsCount: "$totalDownBetsCount",
            prizeAmount: "$prizeAmount",
            upOrDown: {
              $cond: [
                { $gt: ["$totalUpBetsCount", "$totalDownBetsCount"] },
                "up",
                "down",
              ],
            },
          },
        },
        //For now its commented because we have short amount of betting amount
        // {
        //   $match: {
        //     totalTradeAmount: { $gte: 500 }
        //   }
        // }, 
        sortOperator,
      ]);

      return aggregate;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /* For Fetching The Jackpot Amount Which Has Been Accumulated In A Month For The Current Month Only */
  async getWeeklyJackpotAmount() {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({
        isDeleted: false,
        createdAt: { $gte: new Date(moment().startOf("week").format()) },
      });

      conditions["$and"] = and_clauses;
      const aggregate = await this.OrderModel.aggregate([
        { $match: conditions },
        {
          $group: {
            _id: null,
            totalJackpotAmount: { $sum: "$jackpotAmount" },
          },
        },
      ]);

      if (!aggregate.length) return 0;
      return aggregate[0]?.totalJackpotAmount;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /* For Fetching The Daily Win Ratio Listing And Their Ticket Prizes Amount */
  async getWinRatioListing(listingDto: WinRatioListDto): Promise<
    {
      walletId: string;
      profile_image: string;
      country: string;
      totalTradesCount: number;
      winRatio: number;
      rank: number;
      totalUpBetsCount: number;
      totalDownBetsCount: number;
      upOrDown: string;
      prizeAmount: number;
      totalWinsCount: number;
    }[]
  > {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({
        isDeleted: false,
        createdAt: { $gte: new Date(moment().utc().startOf("day").format()) },
      });

      conditions["$and"] = and_clauses;

      /* Custom Field Sorting */
      let sortOperator: PipelineStage.Sort;
      if (listingDto?.sort?.field && listingDto?.sort?.order == "asc") {
        sortOperator = { $sort: { [listingDto?.sort?.field]: 1 } };
      } else if (listingDto?.sort?.field && listingDto?.sort?.order == "desc") {
        sortOperator = { $sort: { [listingDto?.sort?.field]: -1 } };
      } else {
        sortOperator = { $sort: { rank: -1 } };
      }

      const tradePrizes = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
      const aggregate = this.OrderModel.aggregate([
        { $match: conditions },
        /* Lookup Game Data To Get Winning Status For Every Order */
        {
          $lookup: {
            from: "gamecurrents",
            let: { gameId: "$gameId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$gameId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "game_lookup_data",
          },
        },
        { $unwind: "$game_lookup_data" },
        {
          $addFields: {
            isTradeWon: { $eq: ["$game_lookup_data.winnerStatus", "$betFor"] },
          },
        },
        {
          $group: {
            _id: "$walletId",
            totalTradesCount: { $sum: 1 },
            gameResultArray: { $push: "$isTradeWon" },
            betsForArray: { $push: "$betFor" },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userWalletId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$walletId", "$$userWalletId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "user_lookup_data",
          },
        },
        { $unwind: "$user_lookup_data" },
        {
          $addFields: {
            walletId: "$user_lookup_data.walletId",
            profile_image: "$user_lookup_data.profile_image",
            country: "$user_lookup_data.country",
            totalTradesCount: "$totalTradesCount",
            totalWinsCount: {
              $reduce: {
                input: "$gameResultArray",
                initialValue: 0,
                in: {
                  $cond: [
                    "$$value",
                    { $sum: [1, "$$this"] },
                    { $sum: [0, "$$this"] },
                  ],
                },
              },
            },
            totalUpBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "up"] },
              },
            },
            totalDownBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "down"] },
              },
            },
          },
        },
        {
          $addFields: {
            winRatio: {
              $divide: [
                { $multiply: ["$totalWinsCount", 100] },
                "$totalTradesCount",
              ],
            }, // totalWins * 100 / totalTrades
          },
        },
        {
          $setWindowFields: {
            sortBy: { winRatio: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $setWindowFields: {
            sortBy: { totalTradesCount: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $addFields: {
            prizeAmount: {
              $switch: {
                branches: [
                  { case: { $eq: ["$rank", 1] }, then: tradePrizes[0] },
                  { case: { $eq: ["$rank", 2] }, then: tradePrizes[1] },
                  { case: { $eq: ["$rank", 3] }, then: tradePrizes[2] },
                  { case: { $eq: ["$rank", 4] }, then: tradePrizes[3] },
                  { case: { $eq: ["$rank", 5] }, then: tradePrizes[4] },
                  { case: { $eq: ["$rank", 6] }, then: tradePrizes[5] },
                  { case: { $eq: ["$rank", 7] }, then: tradePrizes[6] },
                  { case: { $eq: ["$rank", 8] }, then: tradePrizes[7] },
                  { case: { $eq: ["$rank", 9] }, then: tradePrizes[8] },
                  { case: { $eq: ["$rank", 10] }, then: tradePrizes[9] },
                ],
                default: 0,
              },
            },
          },
        },
        {
          $addFields: {
            totalUpBetsCount: { $size: "$totalUpBets" },
            totalDownBetsCount: { $size: "$totalDownBets" },
          },
        },
        {
          $project: {
            rank: "$rank",
            walletId: "$walletId",
            profile_image: "$profile_image",
            country: "$country",
            totalUpBetsCount: "$totalUpBetsCount",
            totalDownBetsCount: "$totalDownBetsCount",
            prizeAmount: "$prizeAmount",
            totalTradesCount: "$totalTradesCount",
            totalWinsCount: "$totalWinsCount",
            winRatio: "$winRatio",
            upOrDown: {
              $cond: [
                { $gt: ["$totalUpBetsCount", "$totalDownBetsCount"] },
                "up",
                "down",
              ],
            },
          },
        },
        {
          $match: {
            totalTradesCount: { $gte: 50 }
          }
        },
        sortOperator,
      ]);

      return aggregate;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async referralEarnings() {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const aggregate = await this.OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $ne: ["$affiliate_link", ""] },
                { $gte: ["$createdAt", startOfDay] },
                { $lte: ["$createdAt", endOfDay] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "affiliatelinks",
            let: { affiliateLink: "$affiliate_link" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$affiliate_link", "$$affiliateLink"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "affiliate",
          },
        },
        { $unwind: "$affiliate" },
        {
          $group: {
            _id: {
              walletId: "$affiliate.walletId",
              affiliateLink: "$affiliate_link",
            },
            totalReferralEarning: { $sum: "$referralAmount" },
          },
        },
        {
          $group: {
            _id: "$_id.walletId",
            totalReferralEarning: { $sum: "$totalReferralEarning" },
            affiliateLinks: {
              $push: {
                affiliateLink: "$_id.affiliateLink",
                earnings: "$totalReferralEarning",
              },
            },
          },
        },
        {
          $project: {
            referrerWalletId: "$_id",
            totalReferralEarning: 1,
            affiliateLinks: 1,
          },
        },
      ]);

      return aggregate;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async winRatioCronData() {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const tradePrizes = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
      const aggregate = this.OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gte: ["$createdAt", startOfDay] },
                { $lte: ["$createdAt", endOfDay] },
              ],
            },
          },
        },
        {
          $lookup: {
            from: "gamecurrents",
            let: { gameId: "$gameId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$gameId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "game_lookup_data",
          },
        },
        { $unwind: "$game_lookup_data" },
        {
          $addFields: {
            isTradeWon: { $eq: ["$game_lookup_data.winnerStatus", "$betFor"] },
          },
        },
        {
          $group: {
            _id: "$walletId",
            totalTradesCount: { $sum: 1 },
            gameResultArray: { $push: "$isTradeWon" },
            betsForArray: { $push: "$betFor" },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userWalletId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$walletId", "$$userWalletId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "user_lookup_data",
          },
        },
        { $unwind: "$user_lookup_data" },
        {
          $addFields: {
            walletId: "$user_lookup_data.walletId",
            profile_image: "$user_lookup_data.profile_image",
            country: "$user_lookup_data.country",
            totalTradesCount: "$totalTradesCount",
            totalWinsCount: {
              $reduce: {
                input: "$gameResultArray",
                initialValue: 0,
                in: {
                  $cond: [
                    "$$value",
                    { $sum: [1, "$$this"] },
                    { $sum: [0, "$$this"] },
                  ],
                },
              },
            },
            totalUpBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "up"] },
              },
            },
            totalDownBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "down"] },
              },
            },
          },
        },
        {
          $addFields: {
            winRatio: {
              $divide: [
                { $multiply: ["$totalWinsCount", 100] },
                "$totalTradesCount",
              ],
            },
          },
        },
        {
          $setWindowFields: {
            sortBy: { winRatio: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $setWindowFields: {
            sortBy: { totalTradesCount: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $addFields: {
            prizeAmount: {
              $switch: {
                branches: [
                  { case: { $eq: ["$rank", 1] }, then: tradePrizes[0] },
                  { case: { $eq: ["$rank", 2] }, then: tradePrizes[1] },
                  { case: { $eq: ["$rank", 3] }, then: tradePrizes[2] },
                  { case: { $eq: ["$rank", 4] }, then: tradePrizes[3] },
                  { case: { $eq: ["$rank", 5] }, then: tradePrizes[4] },
                  { case: { $eq: ["$rank", 6] }, then: tradePrizes[5] },
                  { case: { $eq: ["$rank", 7] }, then: tradePrizes[6] },
                  { case: { $eq: ["$rank", 8] }, then: tradePrizes[7] },
                  { case: { $eq: ["$rank", 9] }, then: tradePrizes[8] },
                  { case: { $eq: ["$rank", 10] }, then: tradePrizes[9] },
                ],
                default: 0,
              },
            },
          },
        },
        {
          $addFields: {
            totalUpBetsCount: { $size: "$totalUpBets" },
            totalDownBetsCount: { $size: "$totalDownBets" },
          },
        },
        {
          $project: {
            rank: "$rank",
            walletId: "$walletId",
            profile_image: "$profile_image",
            country: "$country",
            totalUpBetsCount: "$totalUpBetsCount",
            totalDownBetsCount: "$totalDownBetsCount",
            prizeAmount: "$prizeAmount",
            totalTradesCount: "$totalTradesCount",
            totalWinsCount: "$totalWinsCount",
            winRatio: "$winRatio",
            upOrDown: {
              $cond: [
                { $gt: ["$totalUpBetsCount", "$totalDownBetsCount"] },
                "up",
                "down",
              ],
            },
          },
        },
        {
          $match: {
            totalTradesCount: { $gte: 50 }
          }
        },
      ]);

      return aggregate;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async highRollerCronData() {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const tradePrizes = [500, 450, 400, 350, 300, 250, 200, 150, 100, 50];
      const aggregate = this.OrderModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $gte: ["$createdAt", startOfDay] },
                { $lte: ["$createdAt", endOfDay] },
              ],
            },
          },
        },
        {
          $group: {
            _id: "$walletId",
            totalTradeAmount: { $sum: "$tradeAmount" },
            totalTurnOver: { $sum: "$winningAmount" },
            betsForArray: { $push: "$betFor" },
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userWalletId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$walletId", "$$userWalletId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "user_lookup_data",
          },
        },
        { $unwind: "$user_lookup_data" },
        {
          $addFields: {
            walletId: "$user_lookup_data.walletId",
            profile_image: "$user_lookup_data.profile_image",
            country: "$user_lookup_data.country",
            totalTradeAmount: "$totalTradeAmount",
            totalTurnOver: "$totalTurnOver",
            totalUpBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "up"] },
              },
            },
            totalDownBets: {
              $filter: {
                input: "$betsForArray",
                as: "bet",
                cond: { $eq: ["$$bet", "down"] },
              },
            },
          },
        },
        {
          $setWindowFields: {
            sortBy: { totalTurnOver: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $addFields: {
            prizeAmount: {
              $switch: {
                branches: [
                  { case: { $eq: ["$rank", 1] }, then: tradePrizes[0] },
                  { case: { $eq: ["$rank", 2] }, then: tradePrizes[1] },
                  { case: { $eq: ["$rank", 3] }, then: tradePrizes[2] },
                  { case: { $eq: ["$rank", 4] }, then: tradePrizes[3] },
                  { case: { $eq: ["$rank", 5] }, then: tradePrizes[4] },
                  { case: { $eq: ["$rank", 6] }, then: tradePrizes[5] },
                  { case: { $eq: ["$rank", 7] }, then: tradePrizes[6] },
                  { case: { $eq: ["$rank", 8] }, then: tradePrizes[7] },
                  { case: { $eq: ["$rank", 9] }, then: tradePrizes[8] },
                  { case: { $eq: ["$rank", 10] }, then: tradePrizes[9] },
                ],
                default: 0,
              },
            },
          },
        },
        {
          $addFields: {
            totalUpBetsCount: { $size: "$totalUpBets" },
            totalDownBetsCount: { $size: "$totalDownBets" },
          },
        },
        {
          $project: {
            walletId: "$walletId",
            profile_image: "$profile_image",
            country: "$country",
            totalTradeAmount: "$totalTradeAmount",
            totalTurnOver: "$totalTurnOver",
            rank: "$rank",
            totalUpBetsCount: "$totalUpBetsCount",
            totalDownBetsCount: "$totalDownBetsCount",
            prizeAmount: "$prizeAmount",
            upOrDown: {
              $cond: [
                { $gt: ["$totalUpBetsCount", "$totalDownBetsCount"] },
                "up",
                "down",
              ],
            },
          },
        },
        {
          $match: {
            totalTradeAmount: { $gte: 500 }
          }
        },
      ]);
      return aggregate;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  /* Get User Highest Winning Amount */
  async getUserHighestWinningData(walletId: string): Promise<number> {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({ isDeleted: false, walletId });

      conditions["$and"] = and_clauses;

      const aggregate = await this.OrderModel.aggregate([
        { $match: conditions },
        /* Lookup Game Data To Get Winning Status For Every Order */
        {
          $lookup: {
            from: "gamecurrents",
            let: { gameId: "$gameId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$gameId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "game_lookup_data",
          },
        },
        { $unwind: "$game_lookup_data" },
        {
          $addFields: {
            isTradeWon: { $eq: ["$game_lookup_data.winnerStatus", "$betFor"] },
          },
        },
        { $match: { isTradeWon: true } },
        { $sort: { winningAmount: -1 } },
        { $limit: 1 }
      ]);

      if (!aggregate?.length) {
        return 0;
      }

      return aggregate[0]?.winningAmount;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  /* Get User Highest Winning or Losing Amount */
  async calculateTotalWinLossAmount(walletId: string, winOrLoss: boolean): Promise<number> {
    try {
      let conditions = {};
      let and_clauses = [];

      and_clauses.push({ isDeleted: false, walletId });

      conditions["$and"] = and_clauses;

      const aggregate = await this.OrderModel.aggregate([
        { $match: conditions },
        /* Lookup Game Data To Get Winning Status For Every Order */
        {
          $lookup: {
            from: "gamecurrents",
            let: { gameId: "$gameId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$gameId"] },
                      { $eq: ["$isDeleted", false] },
                    ],
                  },
                },
              },
            ],
            as: "game_lookup_data",
          },
        },
        { $unwind: "$game_lookup_data" },
        {
          $addFields: {
            isTradeWon: { $eq: ["$game_lookup_data.winnerStatus", "$betFor"] },
          },
        },
        { $match: { isTradeWon: winOrLoss } },
        {
          $group: {
            _id: '$walletId',
            totalAmount: { $sum: '$tradeAmount' }
          }
        }
      ]);

      if (!aggregate?.length) {
        return 0;
      }

      return aggregate[0]?.totalAmount;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

}
