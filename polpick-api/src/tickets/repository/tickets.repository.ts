import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model } from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from 'underscore';
import { BaseRepository } from "src/common/base/base.repository";
import { Ticket, TicketDocument } from "../schemas/tickets.schema";
import * as moment from "moment";


@Injectable()
export class TicketRepository extends BaseRepository<TicketDocument> {
    constructor(
        @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
        @InjectModel(Ticket.name) private ticketModelPaginate: AggregatePaginateModel<TicketDocument>
    ) {
        super(ticketModel, ticketModelPaginate);
    }


    /* Gets Weekly Jackpot Listing From Db */
    async getWeeklyJackpotList(jackpotAmountArray: number[]): Promise<any[]> {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ isDeleted: false });
            and_clauses.push({ date: { $gte: new Date(moment().startOf('week').format()) } });

            conditions['$and'] = and_clauses;

            const aggregate = await this.ticketModel.aggregate([
                { $match: conditions },
                {
                    $group: {
                        _id: '$walletId',
                        totalTicketsCount: { $sum: '$tickets' }
                    }
                },
                {
                    $lookup: {
                        from: 'orders',
                        let: { userWalletId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$walletId', '$$userWalletId'] },
                                            { $eq: ['$isDeleted', false] },
                                        ],
                                    }
                                }
                            }
                        ],
                        as: 'order_lookup_data'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        let: { userWalletId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$walletId', '$$userWalletId'] },
                                            { $eq: ['$isDeleted', false] },
                                        ],
                                    }
                                }
                            }
                        ],
                        as: 'user_lookup_data'
                    }
                },
                { $unwind: '$user_lookup_data' },
                {
                    $addFields: {
                        totalTradesCount: { $size: '$order_lookup_data' }
                    }
                },
                {
                    $setWindowFields: {
                        sortBy: { totalTicketsCount: -1 },
                        output: {
                            rank: {
                                $rank: {}
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        prizeAmount: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ["$rank", 1] }, then: jackpotAmountArray[0] },
                                    { case: { $eq: ["$rank", 2] }, then: jackpotAmountArray[1] },
                                    { case: { $eq: ["$rank", 3] }, then: jackpotAmountArray[2] },
                                ],
                                default: 0
                            }
                        },
                    }
                },
                {
                    $project: {
                        walletId: '$user_lookup_data.walletId',
                        profile_image: '$user_lookup_data.profile_image',
                        country: '$user_lookup_data.country',
                        expected_prize: '$prizeAmount',
                        rank: '$rank',
                        total_tickets_count: '$totalTicketsCount',
                        total_trades_count: '$totalTradesCount'
                    }
                }
            ])

            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /* Gets Users Total Tickets Count For This Week Only */
    async getUserTotalTicketsCount(filterQuery: FilterQuery<TicketDocument>) {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ isDeleted: false });
            and_clauses.push(filterQuery);

            conditions['$and'] = and_clauses;
            const aggregate = await this.ticketModel.aggregate([
                { $match: conditions },
                {
                    $group: {
                        _id: '$walletId',
                        totalTicketsCount: { $sum: '$tickets' }
                    }
                }
            ])

            if(aggregate?.length) {
                return aggregate[0].totalTicketsCount;
            } else {
                return 0;
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
