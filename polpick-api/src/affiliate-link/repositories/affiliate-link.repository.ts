import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { AffiliateLink, AffiliateLinkDocument } from "../schemas/affiliate-link.schema";
import { Click, ClickDocument } from "../schemas/click-count.schema";

import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, PipelineStage } from "mongoose";
import { ListAffiliateLinkDto } from "../dto/affiliate-link.dto";
import * as moment from "moment";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AffiliateLinkRepository extends BaseRepository<AffiliateLinkDocument> {
    constructor(
        @InjectModel(AffiliateLink.name) private affiliateLinkModel: Model<AffiliateLinkDocument>,
        @InjectModel(AffiliateLink.name) private affiliateLinkAggregateModel: AggregatePaginateModel<AffiliateLinkDocument>,
        @InjectModel(Click.name) private ClickModel: Model<ClickDocument>,
        @InjectModel(Click.name) private ClickAggregateModel: AggregatePaginateModel<ClickDocument>,
        private readonly configService: ConfigService
    ) {
        super(affiliateLinkModel, affiliateLinkAggregateModel)
    }

    async getListPaginated(paginatedDto: ListAffiliateLinkDto): Promise<AggregatePaginateResult<AffiliateLinkDocument>> {
        try {
            let conditions = {};
            let and_clauses: FilterQuery<AffiliateLinkDocument>[] = [];

            and_clauses.push({ isDeleted: false });
            and_clauses.push({ walletId: paginatedDto.walletId });

            conditions['$and'] = and_clauses;

            /* Custom Field Sorting */
            let sortOperator: PipelineStage.Sort;
            if (paginatedDto?.sort?.field && paginatedDto?.sort?.order == 'asc') {
                sortOperator = { $sort: { [paginatedDto?.sort?.field]: 1 } };
            } else if (paginatedDto?.sort?.field && paginatedDto?.sort?.order == 'desc') {
                sortOperator = { $sort: { [paginatedDto?.sort?.field]: -1 } };
            } else {
                sortOperator = { $sort: { createdAt: -1 } };
            }

            const aggregate = this.affiliateLinkModel.aggregate([
                { $match: conditions },
                /* Lookup Total Affiliate Signed Up Users */
                {
                    $lookup: {
                        from: 'users',
                        let: { referrerWalletId: paginatedDto.walletId, affiliateLinkParent: '$link_name' },
                        pipeline: [
                            { $match: { referral_link: { $ne: '' } } },
                            {
                                $lookup: {
                                    from: 'affiliatelinks',
                                    let: { affiliateLink: '$referral_link' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ['$link_name', '$$affiliateLink'] },
                                                        { $eq: ['$isDeleted', false] },
                                                    ],
                                                }
                                            }
                                        }
                                    ],
                                    as: 'affiliate_link_lookup_data'
                                }
                            },
                            { $unwind: '$affiliate_link_lookup_data' },
                            {
                                $project: {
                                    referral_link: '$referral_link',
                                    referrerWalletId: '$affiliate_link_lookup_data.walletId',
                                }
                            },
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$referrerWalletId', '$$referrerWalletId'] },
                                            { $eq: ['$referral_link', '$$affiliateLinkParent'] }
                                        ]
                                    }
                                }
                            },
                        ],
                        as: 'affiliate_users_lookup_data'
                    }
                },
                /* Lookup Affiliate Order Bets & Earnings Total */
                {
                    $lookup: {
                        from: 'orders',
                        let: { affiliateLinkNameParent: '$link_name' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$affiliate_link', '$$affiliateLinkNameParent'] },
                                            { $eq: ['$isDeleted', false] },
                                        ],
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$affiliate_link',
                                    totalEarnings: { $sum: '$referralAmount' },
                                }
                            }
                        ],
                        as: 'all_time_orders_lookup_data'
                    }
                },
                /* Lookup Affiliate Order Bets & Earnings Todays */
                {
                    $lookup: {
                        from: 'orders',
                        let: { affiliateLinkNameParent: '$link_name' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$affiliate_link', '$$affiliateLinkNameParent'] },
                                            { $eq: ['$isDeleted', false] },
                                            { $gte: ['$createdAt', new Date(moment().utc().startOf('day').format())] },
                                        ],
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$affiliate_link',
                                    totalEarnings: { $sum: '$referralAmount' },
                                }
                            }
                        ],
                        as: 'todays_orders_lookup_data'
                    }
                },
                {
                    $project: {
                        walletId: '$walletId',
                        link_name: '$link_name',
                        affiliate_link: '$affiliate_link',
                        total_affiliated_users: { $size: '$affiliate_users_lookup_data' },
                        total_earnings: {
                            $reduce: {
                                input: '$all_time_orders_lookup_data',
                                initialValue: 0,
                                in: { $add: ["$$value", "$$this.totalEarnings"] }
                            }
                        },
                        total_earnings_todays: {
                            $reduce: {
                                input: '$todays_orders_lookup_data',
                                initialValue: 0,
                                in: { $add: ["$$value", "$$this.totalEarnings"] }
                            }
                        },
                        createdAt: '$createdAt'
                    }
                },
                sortOperator
            ])


            const options = { page: paginatedDto.page, limit: paginatedDto.limit };
            return await this.affiliateLinkAggregateModel.aggregatePaginate(aggregate, options);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async getAffiliateStats(filterQuery: FilterQuery<AffiliateLinkDocument>): Promise<any> {
        try {
            let conditions = {};
            let and_clauses: FilterQuery<AffiliateLinkDocument>[] = [];

            and_clauses.push({ isDeleted: false });
            and_clauses.push(filterQuery);

            conditions['$and'] = and_clauses;

            const aggregate = await this.affiliateLinkModel.aggregate([
                { $match: conditions }
            ])

            if (!aggregate.length) return null;

            return aggregate[0];
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async saveClicks(data: any): Promise<any> {
        try {
            return await this.ClickModel.create(data);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async checkIfAddressesExist(ipv4: string[], ipv6: string[]): Promise<boolean> {
        const count = await this.ClickModel.countDocuments({
            $or: [
                { ipv4: { $in: ipv4 } },
                { ipv6: { $in: ipv6 } },
            ]
        }).exec();
        return count > 0;
    }
}