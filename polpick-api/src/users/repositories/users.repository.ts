import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Users, UsersDocument } from '../schemas/users.schema';
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model, PipelineStage, ProjectionFields, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'underscore';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base/base.repository';
import { UserListPaginatedDto } from '../dto/admin.dto';
import * as moment from 'moment';

@Injectable()
export class UserRepository extends BaseRepository<UsersDocument> {
    constructor(
        @InjectModel(Users.name) private UserModel: Model<UsersDocument>,
        @InjectModel(Users.name) private UserAggregateModel: AggregatePaginateModel<UsersDocument>
    ) {
        super(UserModel, UserAggregateModel);
    }

    async authentication(id: Types.ObjectId): Promise<UsersDocument> {
        try {
            let user = await this.UserModel.aggregate([
                { $match: { _id: id, isDeleted: false, status: "Active" } },
                {
                    $lookup: {
                        from: 'roles',
                        let: { role: '$role' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$role"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    isDeleted: 0
                                }
                            }
                        ],
                        as: 'role'
                    }
                },
                { $unwind: "$role" },
                {
                    $lookup: {
                        from: 'userdevices',
                        localField: '_id',
                        foreignField: 'user_id',
                        as: 'user_devices'
                    }
                },
                {
                    $project: {
                        username: '$username',
                        full_name: '$full_name',
                        walletId: '$walletId',
                        country: '$country',
                        role: '$role',
                        email: '$email',
                        phone: '$phone',
                        countryCode: '$countryCode',
                        password: '$password',
                        profile_image: '$profile_image',
                        signupType: '$signupType',
                        socialAccounts: '$socialAccounts',
                        social_link: '$social_link',
                        whiteLabelId: '$whiteLabelId',
                        isAffiliateManager: '$isAffiliateManager',
                        referral_link: '$referral_link',
                        telegramId: '$telegramId',
                        betsCount: '$betsCount',
                        winningCount: '$winningCount',
                        winStreakCount: '$winStreakCount',
                        firstTrade: '$firstTrade',
                        status: '$status',
                        isDeleted: '$isDeleted',
                        user_devices: '$user_devices',
                    }
                }
            ]);

            if (user?.length) return user[0];
            return null;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async fineOneWithRole(params: FilterQuery<UsersDocument>): Promise<UsersDocument> {
        try {
            let user = await this.UserModel.findOne({
                email: params.email,
                role: { $in: params.roles },
                isDeleted: false,
                status: "Active"
            }).populate('role').exec();

            return user;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllUsersPaginated(paginatedDto: UserListPaginatedDto): Promise<AggregatePaginateResult<UsersDocument>> {
        try {
            let conditions = {};
            let and_clauses: FilterQuery<UsersDocument>[] = [];

            and_clauses.push({ isDeleted: false, role: new Types.ObjectId(paginatedDto.role) });

            if (paginatedDto?.search?.trim()) {
                and_clauses.push({
                    $or: [
                        { walletId: { $regex: paginatedDto.search.trim(), $options: 'i' } },
                    ]
                });
            }

            conditions['$and'] = and_clauses;

            /* Custom Field Sorting */
            let sortOperator: PipelineStage.Sort;
            if (paginatedDto?.sort?.field && paginatedDto?.sort?.order == 'asc') {
                sortOperator = { $sort: { [paginatedDto?.sort?.field]: 1 } };
            } else if (paginatedDto?.sort?.field && paginatedDto?.sort?.order == 'desc') {
                sortOperator = { $sort: { [paginatedDto?.sort?.field]: -1 } };
            } else {
                sortOperator = { $sort: { _id: -1 } };
            }

            let aggregate = this.UserModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: "roles",
                        let: { role: "$role" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$role"] },
                                            { $eq: ["$isDeleted", false] }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: "$_id",
                                    role: "$role",
                                    roleDisplayName: "$roleDisplayName"
                                }
                            }
                        ],
                        as: "user_role"
                    }
                },
                { $unwind: "$user_role" },
                {
                    $lookup: {
                        from: 'tickets',
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
                            },
                            {
                                $group: {
                                    _id: '$walletId',
                                    totalTicketsCount: { $sum: '$tickets' }
                                }
                            },
                        ],
                        as: 'ticket_lookup_data'
                    }
                },
                {
                    $unwind: {
                        path: '$ticket_lookup_data',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        username: '$username',
                        user_role: '$user_role',
                        totalTickets: { $ifNull: ['$ticket_lookup_data.totalTicketsCount', 0] },
                        walletId: '$walletId',
                        country: '$country',
                        role: '$role',
                        email: '$email',
                        phone: '$phone',
                        countryCode: '$countryCode',
                        profile_image: '$profile_image',
                        signupType: '$signupType',
                        socialAccounts: '$socialAccounts',
                        social_link: '$social_link',
                        whiteLabelId: '$whiteLabelId',
                        isAffiliateManager: '$isAffiliateManager',
                        referral_link: '$referral_link',
                        telegramId: '$telegramId',
                        betsCount: '$betsCount',
                        winningCount: '$winningCount',
                        winStreakCount: '$winStreakCount',
                        firstTrade: '$firstTrade',
                        status: '$status',
                        createdAt: '$createdAt',
                        updatedAt: '$updatedAt',
                        // full_name: '$full_name',
                        // password: '$password',
                    }
                },
                sortOperator
            ]);

            const options = { page: paginatedDto.page, limit: paginatedDto.limit };
            const allUsers = await this.UserAggregateModel.aggregatePaginate(aggregate, options);
            return allUsers;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }


    async getUserDetails(params: FilterQuery<UsersDocument>): Promise<UsersDocument[]> {
        try {
            let aggregate = await this.UserModel.aggregate([
                { $match: params },
                {
                    $lookup: {
                        from: "roles",
                        let: { role: "$role" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$role"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: "$_id",
                                    role: "$role",
                                    roleDisplayName: "$roleDisplayName"
                                }
                            }
                        ],
                        as: "role"
                    }
                },
                { $unwind: "$role" },
                {
                    $lookup: {
                        from: 'tickets',
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
                            },
                            {
                                $group: {
                                    _id: '$walletId',
                                    totalTicketsCount: { $sum: '$tickets' }
                                }
                            },
                        ],
                        as: 'ticket_lookup_data'
                    }
                },
                {
                    $unwind: {
                        path: '$ticket_lookup_data',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        totalTicketsCount: { $ifNull: ['$ticket_lookup_data.totalTicketsCount', 0] },
                    }
                },
                {
                    $project: {
                        password: 0,
                        stripeCustomerId: 0,
                        isDeleted: 0,
                        phoneOTP: 0,
                        emailOTP: 0,
                        otpExpireTime: 0,
                        signupCompleted: 0,
                        signupType: 0,
                        updatedAt: 0,
                        otpType: 0,
                        socialAccounts: 0,
                        ticket_lookup_data: 0
                    }
                }
            ]);
            if (!aggregate) return null;
            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllUsersByReferralLink(filterQuery: FilterQuery<UsersDocument>) {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push(filterQuery);

            conditions['$and'] = and_clauses;

            const aggregate = await this.UserModel.aggregate([
                // {
                //     $lookup: {
                //         from: 'affiliatelinks',
                //         let: { affiliateLink: '$referral_link' },
                //         pipeline: [
                //             {
                //                 $match: {
                //                     $expr: {
                //                         $and: [
                //                             { $eq: ['$affiliate_link', '$$affiliateLink'] },
                //                             { $eq: ['$isDeleted', false] },
                //                         ],
                //                     }
                //                 }
                //             }
                //         ],
                //         as: 'affiliate_link_lookup_data'
                //     }
                // },
                // {
                //     $unwind: {
                //         preserveNullAndEmptyArrays: true,
                //         path: '$affiliate_link_lookup_data'
                //     }
                // },
                { $match: conditions },
                {
                    $project: {
                        username: '$username',
                        full_name: '$full_name',
                        walletId: '$walletId',
                        role: '$role',
                        email: '$email',
                        profile_image: '$profile_image',
                        whiteLabelId: '$whiteLabelId',
                        referral_link: '$referral_link',
                        status: '$status',
                        isDeleted: '$isDeleted',
                        refferrerWalletId: '$refferrerWalletId'
                    }
                },
            ])

            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    /* Fetch User Details With Game Activity Details */
    async getUserActivityDetails(filterQuery: FilterQuery<UsersDocument>): Promise<UsersDocument> {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push(filterQuery);

            conditions['$and'] = and_clauses;

            const aggregate = await this.UserModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'orders',
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
                            },
                            {
                                $group: {
                                    _id: '$walletId',
                                    averageBet: { $avg: '$tradeAmount' },
                                    totalBetAmount: { $sum: '$tradeAmount' },
                                }
                            },
                        ],
                        as: 'order_lookup_data'
                    }
                },
                {
                    $unwind: {
                        path: '$order_lookup_data',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        walletId: '$walletId',
                        country: '$country',
                        createdAt: '$createdAt',
                        lastWalletConnected: '$lastWalletConnected',
                        totalGames: '$betsCount',
                        averageBet: { $ifNull: ['$order_lookup_data.averageBet', 0] },
                        betVolume: { $ifNull: ['$order_lookup_data.totalBetAmount', 0] },
                    }
                }
            ]);

            if (!aggregate?.length) {
                return null;
            }

            return aggregate[0];
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error.message);
        }
    }



    async getCustomData(params: any): Promise<any> {
        try {
            let aggregate = await this.UserModel.aggregate([
                { $match: params },
                {
                    $lookup: {
                        "from": "roles",
                        let: { role: "$role" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$_id", "$$role"] }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: "$_id",
                                    role: "$role",
                                    roleDisplayName: "$roleDisplayName"
                                }
                            }
                        ],
                        "as": "role"
                    }
                },
                { "$unwind": "$role" },
                {
                    $project: {
                        password: 0,
                        stripeCustomerId: 0,
                        isDeleted: 0,
                        updatedAt: 0,
                        verificationDocs: 0,
                        otpType: 0,
                        appleId: 0,
                        googleId: 0,
                        isEmailVerified: 0,
                        isPhoneVerified: 0,
                        otp: 0,
                        otpExpireTime: 0,
                        isOtpVerified: 0,
                        isLoginOtpVerified: 0,
                        loginOtpExpireTime: 0,
                        loginOtp: 0,
                        socialAccount: 0,
                        selectedstickers: 0,
                        user_details: 0,
                        wallet_id: 0,
                        countryCode: 0,
                        username: 0,
                        status: 0,
                        phone: 0,
                        address: 0
                    }
                },
            ]);


            if (!aggregate) return null;
            return aggregate;
        } catch (e) {
            return e;
        }
    }


    async getAffiliateGraphYearWise(filterQuery: any) {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ "isDeleted": false });
            and_clauses.push({
                referrerWalletId: filterQuery.referrerWalletId
            });
            // and_clauses.push({
            //     createdAt: {
            //         $gte: new Date(`${filterQuery.year}-01-01T00:00:00.000Z`),
            //         $lte: new Date(`${filterQuery.year}-12-31T23:59:59.999Z`)
            //     }
            // });

            conditions['$and'] = and_clauses;

            const aggregate = await this.UserModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'orders',
                        let: { referral_link: "$referral_link" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$affiliate_link", "$$referral_link"] },
                                            { $gte: ["$createdAt", new Date(`${filterQuery.year}-01-01T00:00:00.000Z`)] },
                                            { $lte: ["$createdAt", new Date(`${filterQuery.year}-12-31T23:59:59.999Z`)] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'orders'
                    }
                },
                { $unwind: "$orders" },
                {
                    $group: {
                        _id: {
                            year: { $year: "$orders.createdAt" },
                            month: { $month: "$orders.createdAt" }
                        },
                        uniqueWallets: { $addToSet: "$walletId" },
                        count: { $sum: 1 },
                        totalTradeAmount: { $sum: "$orders.tradeAmount" },
                        totalWinningAmount: { $sum: "$orders.winningAmount" }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }
                },
                {
                    $facet: {
                        months: [
                            {
                                $project: {
                                    _id: 0,
                                    month: [
                                        { $literal: 1 }, { $literal: 2 }, { $literal: 3 }, { $literal: 4 },
                                        { $literal: 5 }, { $literal: 6 }, { $literal: 7 }, { $literal: 8 },
                                        { $literal: 9 }, { $literal: 10 }, { $literal: 11 }, { $literal: 12 }
                                    ]
                                }
                            },
                            { $unwind: "$month" }
                        ],
                        counts: [
                            {
                                $project: {
                                    _id: 0,
                                    month: "$_id.month",
                                    uniqueWallets: "$uniqueWallets",
                                    count: "$count",
                                    totalTradeAmount: "$totalTradeAmount",
                                    totalWinningAmount: "$totalWinningAmount"
                                }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        data: {
                            $map: {
                                input: "$months",
                                as: "month",
                                in: {
                                    month: "$$month.month",
                                    totalConnectedWallets: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.month", "$$month.month"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $size: { $ifNull: ["$$count.uniqueWallets", []] } }
                                        }
                                    },
                                    totalBetAmount: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.month", "$$month.month"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $ifNull: ["$$count.totalTradeAmount", 0] }
                                        }
                                    },
                                    totalEarnings: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.month", "$$month.month"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $ifNull: ["$$count.totalWinningAmount", 0] }
                                        }
                                    },
                                    clicks: 0
                                }
                            }
                        }
                    }
                },
                { $unwind: "$data" },
                {
                    $replaceRoot: {
                        newRoot: "$data"
                    }
                }
            ]);

            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    // async getAffiliateGraphWeekWise(filterQuery: any) {
    //     try {
    //         let conditions = {};
    //         let and_clauses = [];

    //         and_clauses.push({ "isDeleted": false });
    //         and_clauses.push({
    //             referrerWalletId: filterQuery.referrerWalletId
    //         });
    //         and_clauses.push({
    //             createdAt: {
    //                 $gte: new Date(filterQuery.startDate), // Start date of the week
    //                 $lte: new Date(filterQuery.endDate)    // End date of the week
    //             }
    //         });

    //         conditions['$and'] = and_clauses;

    //         const aggregate = await this.UserModel.aggregate([
    //             { $match: conditions },
    //             {
    //                 $lookup: {
    //                     from: 'orders',
    //                     let: { referral_link: "$referral_link" },
    //                     pipeline: [
    //                         {
    //                             $match: {
    //                                 $expr: {
    //                                     $and: [
    //                                         { $eq: ["$affiliate_link", "$$referral_link"] },
    //                                         { $gte: ["$createdAt", new Date(filterQuery.startDate)] }, // Start date of the week
    //                                         { $lte: ["$createdAt", new Date(filterQuery.endDate)] }    // End date of the week
    //                                     ]
    //                                 }
    //                             }
    //                         }
    //                     ],
    //                     as: 'orders'
    //                 }
    //             },
    //             { $unwind: "$orders" },
    //             {
    //                 $addFields: {
    //                     dayOfWeek: { $isoDayOfWeek: "$orders.createdAt" } // Get ISO day of the week (Monday = 1, ..., Sunday = 7)
    //                 }
    //             },
    //             {
    //                 $group: {
    //                     _id: "$dayOfWeek",
    //                     uniqueWallets: { $addToSet: "$walletId" },
    //                     count: { $sum: 1 },
    //                     totalTradeAmount: { $sum: "$orders.tradeAmount" },
    //                     totalWinningAmount: { $sum: "$orders.winningAmount" }
    //                 }
    //             },
    //             {
    //                 $sort: { "_id": 1 }
    //             },
    //             {
    //                 $facet: {
    //                     days: [
    //                         {
    //                             $project: {
    //                                 _id: 0,
    //                                 day: "$_id",
    //                                 totalConnectedWallets: {
    //                                     $size: { $ifNull: ["$uniqueWallets", []] }
    //                                 },
    //                                 totalBetAmount: "$totalTradeAmount",
    //                                 totalEarnings: "$totalWinningAmount"
    //                             }
    //                         }
    //                     ]
    //                 }
    //             },
    //             { $unwind: "$days" },
    //             { $replaceRoot: { newRoot: "$days" } }
    //         ]);

    //         return aggregate;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.message);
    //     }
    // }


    async getAffiliateGraphWeekWise(filterQuery: any) {
        try {
            // Calculate start and end of the week based on the provided date
            const startDate = moment(filterQuery.date).startOf('isoWeek').toDate();
            const endDate = moment(filterQuery.date).endOf('isoWeek').toDate();

            const aggregate = await this.UserModel.aggregate([
                {
                    $match: {
                        "isDeleted": false,
                        "referrerWalletId": filterQuery.referrerWalletId,
                        // "createdAt": { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $lookup: {
                        from: 'orders',
                        let: { referral_link: "$referral_link" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$affiliate_link", "$$referral_link"] },
                                            { $gte: ["$createdAt", startDate] },
                                            { $lte: ["$createdAt", endDate] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'orders'
                    }
                },
                {
                    $unwind: { path: "$orders", preserveNullAndEmptyArrays: true }
                },
                {
                    $group: {
                        _id: { $dayOfWeek: { $ifNull: ["$orders.createdAt", { $literal: [1, 2, 3, 4, 5, 6, 7] }] } },
                        uniqueWallets: { $addToSet: "$walletId" },
                        count: { $sum: { $cond: [{ $ifNull: ["$orders", false] }, 1, 0] } },
                        totalTradeAmount: { $sum: { $cond: [{ $ifNull: ["$orders", false] }, "$orders.tradeAmount", 0] } },
                        totalWinningAmount: { $sum: { $cond: [{ $ifNull: ["$orders", false] }, "$orders.winningAmount", 0] } }
                    }
                },
                {
                    $project: {
                        dayOfWeek: "$_id",
                        totalConnectedWallets: { $size: "$uniqueWallets" }, // Calculate total connected wallets
                        totalBetAmount: "$totalTradeAmount",
                        totalEarnings: "$totalWinningAmount",
                        clicks: { $literal: 0 } // Set clicks to a numeric value 0
                    }
                },
                {
                    $sort: { "dayOfWeek": 1 }
                }
            ]);

            // Ensure all days of the week are present in the result, even if they have zero data
            const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
            const result = daysOfWeek.map(dayOfWeek => {
                const found = aggregate.find(entry => entry.dayOfWeek === dayOfWeek);
                if (found) {
                    return found;
                } else {
                    return {
                        dayOfWeek,
                        totalConnectedWallets: 0,
                        totalBetAmount: 0,
                        totalEarnings: 0,
                        clicks: 0
                    };
                }
            });

            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async getAffiliateGraphMonthWise(filterQuery: any) {
        try {
            // console.log(filterQuery, "filterQuery");

            // Construct the start and end dates for the given month
            const year = filterQuery.year;
            const month = filterQuery.month.toString().padStart(2, '0');
            const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
            const endDate = new Date(year, filterQuery.month, 0);
            endDate.setHours(23, 59, 59, 999);

            // console.log(`Start Date: ${startDate}`);
            // console.log(`End Date: ${endDate}`);

            let conditions = {};
            let and_clauses = [];

            // Add basic conditions
            and_clauses.push({ "isDeleted": false });
            and_clauses.push({
                referrerWalletId: filterQuery.referrerWalletId
            });

            conditions['$and'] = and_clauses;

            const aggregate = await this.UserModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'orders',
                        let: { referral_link: "$referral_link" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$affiliate_link", "$$referral_link"] },
                                            { $gte: ["$createdAt", startDate] },
                                            { $lte: ["$createdAt", endDate] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'orders'
                    }
                },
                { $unwind: "$orders" },
                {
                    $group: {
                        _id: {
                            year: { $year: "$orders.createdAt" },
                            month: { $month: "$orders.createdAt" },
                            day: { $dayOfMonth: "$orders.createdAt" }
                        },
                        uniqueWallets: { $addToSet: "$walletId" },
                        count: { $sum: 1 },
                        totalTradeAmount: { $sum: "$orders.tradeAmount" },
                        totalWinningAmount: { $sum: "$orders.winningAmount" }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
                },
                {
                    $facet: {
                        days: [
                            {
                                $project: {
                                    _id: 0,
                                    day: [
                                        ...Array.from({ length: endDate.getDate() }, (_, i) => i + 1)
                                    ]
                                }
                            },
                            { $unwind: "$day" }
                        ],
                        counts: [
                            {
                                $project: {
                                    _id: 0,
                                    day: "$_id.day",
                                    uniqueWallets: "$uniqueWallets",
                                    count: "$count",
                                    totalTradeAmount: "$totalTradeAmount",
                                    totalWinningAmount: "$totalWinningAmount"
                                }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        data: {
                            $map: {
                                input: "$days",
                                as: "day",
                                in: {
                                    day: "$$day.day",
                                    totalConnectedWallets: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.day", "$$day.day"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $size: { $ifNull: ["$$count.uniqueWallets", []] } }
                                        }
                                    },
                                    totalBetAmount: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.day", "$$day.day"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $ifNull: ["$$count.totalTradeAmount", 0] }
                                        }
                                    },
                                    totalEarnings: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.day", "$$day.day"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $ifNull: ["$$count.totalWinningAmount", 0] }
                                        }
                                    },
                                    clicks: 0
                                }
                            }
                        }
                    }
                },
                { $unwind: "$data" },
                {
                    $replaceRoot: {
                        newRoot: "$data"
                    }
                }
            ]);

            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async getAffiliateGraphDayWise(filterQuery: any) {
        try {
    
            // Construct the start and end dates for the given date
            const year = filterQuery.year;
            const month = filterQuery.month.toString().padStart(2, '0');
            const day = filterQuery.day.toString().padStart(2, '0');
            const startDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            const endDate = new Date(`${year}-${month}-${day}T23:59:59.999Z`);
    
    
            let conditions = {};
            let and_clauses = [];
    
            // Add basic conditions
            and_clauses.push({ "isDeleted": false });
            and_clauses.push({
                referrerWalletId: filterQuery.referrerWalletId
            });
    
            conditions['$and'] = and_clauses;
    
            const aggregate = await this.UserModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'orders',
                        let: { referral_link: "$referral_link" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$affiliate_link", "$$referral_link"] },
                                            { $gte: ["$createdAt", startDate] },
                                            { $lte: ["$createdAt", endDate] }
                                        ]
                                    }
                                }
                            }
                        ],
                        as: 'orders'
                    }
                },
                { $unwind: "$orders" },
                {
                    $group: {
                        _id: {
                            year: { $year: "$orders.createdAt" },
                            month: { $month: "$orders.createdAt" },
                            day: { $dayOfMonth: "$orders.createdAt" },
                            hour: { $hour: "$orders.createdAt" }
                        },
                        uniqueWallets: { $addToSet: "$walletId" },
                        count: { $sum: 1 },
                        totalTradeAmount: { $sum: "$orders.tradeAmount" },
                        totalWinningAmount: { $sum: "$orders.winningAmount" }
                    }
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 }
                },
                {
                    $facet: {
                        hours: [
                            {
                                $project: {
                                    _id: 0,
                                    hour: [
                                        ...Array.from({ length: 24 }, (_, i) => i)
                                    ]
                                }
                            },
                            { $unwind: "$hour" }
                        ],
                        counts: [
                            {
                                $project: {
                                    _id: 0,
                                    hour: "$_id.hour",
                                    uniqueWallets: "$uniqueWallets",
                                    count: "$count",
                                    totalTradeAmount: "$totalTradeAmount",
                                    totalWinningAmount: "$totalWinningAmount"
                                }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        data: {
                            $map: {
                                input: "$hours",
                                as: "hour",
                                in: {
                                    hour: "$$hour.hour",
                                    totalConnectedWallets: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.hour", "$$hour.hour"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $size: { $ifNull: ["$$count.uniqueWallets", []] } }
                                        }
                                    },
                                    totalBetAmount: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.hour", "$$hour.hour"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $ifNull: ["$$count.totalTradeAmount", 0] }
                                        }
                                    },
                                    totalEarnings: {
                                        $let: {
                                            vars: {
                                                count: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: "$counts",
                                                                as: "c",
                                                                cond: { $eq: ["$$c.hour", "$$hour.hour"] }
                                                            }
                                                        }, 0
                                                    ]
                                                }
                                            },
                                            in: { $ifNull: ["$$count.totalWinningAmount", 0] }
                                        }
                                    },
                                    clicks: 0
                                }
                            }
                        }
                    }
                },
                { $unwind: "$data" },
                {
                    $replaceRoot: {
                        newRoot: "$data"
                    }
                }
            ]);
    
            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
    


}