import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, Model, PipelineStage } from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as _ from 'underscore';
import { BaseRepository } from "src/common/base/base.repository";
import { JackpotHistory, JackpotHistoryDocument } from "../schema/jackpot-history.schema";
import { WeeklyJackpotHistoryListDto } from "src/weekly-timeline/dto/weekly.dto";
import * as moment from "moment";

@Injectable()
export class JackpotHistoryRepository extends BaseRepository<JackpotHistoryDocument> {
    constructor(
        @InjectModel(JackpotHistory.name) private jackpotHistoryModel: Model<JackpotHistoryDocument>,
        @InjectModel(JackpotHistory.name) private jackpotHistoryAggregateModel: AggregatePaginateModel<JackpotHistoryDocument>,
    ) {
        super(jackpotHistoryModel, jackpotHistoryAggregateModel);
    }

    async fetchJackpotHistoryListing(listingDto: WeeklyJackpotHistoryListDto): Promise<JackpotHistoryDocument[]> {
        try {
            let conditions = {};
            let and_clauses = [];
            let limitFilter = { $limit: 500 };

            and_clauses.push({ isDeleted: false });

            if (listingDto.week_date) {
                and_clauses.push({ week_of_year: (moment(listingDto.week_date, 'YYYY-MM-DD').utc().week() - 1) })
            } else {
                and_clauses.push({ week_of_year: (moment().utc().week() - 1) })
            }

            conditions['$and'] = and_clauses;

            /* Custom Field Sorting */
            let sortOperator: PipelineStage.Sort;
            if (listingDto?.sort?.field && listingDto?.sort?.order == 'asc') {
                sortOperator = { $sort: { [listingDto?.sort?.field]: 1 } };
            } else if (listingDto?.sort?.field && listingDto?.sort?.order == 'desc') {
                sortOperator = { $sort: { [listingDto?.sort?.field]: -1 } };
            } else {
                sortOperator = { $sort: { rank: -1 } };
            }

            if (listingDto.top_only) {
                sortOperator = { $sort: { rank: 1 } };
                limitFilter['$limit'] = 3;
            }

            const aggregate = await this.jackpotHistoryModel.aggregate([
                {
                    $addFields: {
                        week_of_year: { $week: '$result_date' },
                    }
                },
                { $match: conditions },
                {
                    $lookup: {
                        from: 'users',
                        let: { userWalletId: '$walletId' },
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
                    $project: {
                        walletId: '$walletId',
                        profile_image: '$user_lookup_data.profile_image',
                        country: '$user_lookup_data.country',
                        rank: '$rank',
                        expected_prize: '$expected_prize',
                        week_of_year: '$week_of_year',
                        total_tickets_count: '$total_tickets_count',
                        total_trades_count: '$total_trades_count',
                        result_date: '$result_date',
                        week_start_date: '$week_start_date',
                        week_end_date: '$week_end_date',
                        status: '$status',
                        isDeleted: '$isDeleted',
                    }
                },
                sortOperator,
                limitFilter
            ])

            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async save(body: any): Promise<any> {
        try {
            return await this.jackpotHistoryModel.create(body);
        } catch (error) {
            return error;
        }
    }
}