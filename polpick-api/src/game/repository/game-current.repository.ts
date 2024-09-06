import { InjectModel } from "@nestjs/mongoose";
import { AggregatePaginateModel, AggregatePaginateResult, FilterQuery, Model } from "mongoose";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { GameCurrent, GameCurrentDocument } from "../schemas/game-current.schema";
import * as moment from "moment";
import { GameListPaginatedDto } from "../dto/dto.game";

@Injectable()
export class GameCurrentRepository extends BaseRepository<GameCurrentDocument> {
    constructor(
        @InjectModel(GameCurrent.name) private gameCurrentModel: Model<GameCurrentDocument>,
        @InjectModel(GameCurrent.name) private gameCurrentAggregateModel: AggregatePaginateModel<GameCurrentDocument>,
    ) {
        super(gameCurrentModel, gameCurrentAggregateModel);
    }

    // async getGamesHistoryListing(gameListPaginatedDto: GameListPaginatedDto) {
    //     try {
    //         let conditions = {};
    //         let and_clauses: FilterQuery<GameCurrentDocument>[] = [];

    //         and_clauses.push({ isDeleted: false, winnerStatus: { $ne: 'draw' } });

    //         if (gameListPaginatedDto.type) {
    //             and_clauses.push({ gameType: gameListPaginatedDto.type });
    //         } else {
    //             and_clauses.push({ gameType: '15' });
    //         }

    //         conditions['$and'] = and_clauses;
    //         const aggregate = this.gameCurrentModel.aggregate([
    //             { $match: conditions },
    //             {
    //                 $addFields: {
    //                     gameStartPrice: '$start_price',
    //                     gameEndPrice: '$end_price',
    //                     winnerStatus: {
    //                         $cond: [
    //                             { $eq: ['$end_price', '$start_price'] },
    //                             'draw',
    //                             {
    //                                 $cond: [
    //                                     { $gt: ['$end_price', '$start_price'] },
    //                                     'up',
    //                                     'down'
    //                                 ]
    //                             }
    //                         ]
    //                     },
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: 'orders',
    //                     let: { currentGameId: '$_id' },
    //                     pipeline: [
    //                         {
    //                             $match: {
    //                                 $expr: {
    //                                     $and: [
    //                                         { $eq: [{ $toObjectId: '$gameId' }, '$$currentGameId'] },
    //                                     ]
    //                                 }
    //                             }
    //                         },
    //                     ],
    //                     as: 'orders_lookup_data'
    //                 }
    //             },
    //             {
    //                 $project: {
    //                     gameId: '$gameId',
    //                     gameType: '$gameType',
    //                     gameStartTme: '$gameTimeStart',
    //                     gameEndTme: '$gameTimeEnd',
    //                     gameStartPrice: '$start_price',
    //                     gameEndPrice: '$end_price',
    //                     result: '$winnerStatus',
    //                     batchSize: '$batchSize',
    //                     usersCount: { $size: '$orders_lookup_data' },
    //                     isDeleted: '$isDeleted',
    //                     createdAt: '$createdAt',
    //                     prizeAmount: '0'
    //                 }
    //             },
    //             { $sort: { _id: -1 } }
    //         ])

    //         const options = { page: gameListPaginatedDto.page, limit: gameListPaginatedDto.limit };


    //         let allRecord = await this.gameCurrentAggregateModel.aggregatePaginate(aggregate, options);

    //         return allRecord;
    //     } catch (error) {
    //         throw new InternalServerErrorException(error.message);
    //     }
    // }



    async getGamesHistoryListing(gameListPaginatedDto: GameListPaginatedDto) {
        try {
            const { type, page, limit } = gameListPaginatedDto;
            const conditions: FilterQuery<GameCurrentDocument> = {
                isDeleted: false,
                winnerStatus: { $ne: 'draw' },
                gameType: type || '15'
            };

            const aggregate = this.gameCurrentModel.aggregate([
                { $match: conditions },
                {
                    $addFields: {
                        gameStartPrice: '$start_price',
                        gameEndPrice: '$end_price',
                        winnerStatus: {
                            $cond: [
                                { $eq: ['$end_price', '$start_price'] },
                                'draw',
                                {
                                    $cond: [
                                        { $gt: ['$end_price', '$start_price'] },
                                        'up',
                                        'down'
                                    ]
                                }
                            ]
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'orders',
                        let: { currentGameId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$gameId', '$$currentGameId']
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 1
                                }
                            }
                        ],
                        as: 'orders_lookup_data'
                    }
                },
                {
                    $project: {
                        gameId: 1,
                        gameType: 1,
                        gameStartTme: '$gameTimeStart',
                        gameEndTme: '$gameTimeEnd',
                        gameStartPrice: '$start_price',
                        gameEndPrice: '$end_price',
                        result: '$winnerStatus',
                        batchSize: 1,
                        usersCount: { $size: '$orders_lookup_data' },
                        isDeleted: 1,
                        createdAt: 1,
                        prizeAmount: '0'
                    }
                },
                // { $sort: { _id: -1 } }
            ]);

            const options = { page, limit };

            const allRecord = await this.gameCurrentAggregateModel.aggregatePaginate(aggregate, options);

            return allRecord;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }



    async getRecentWinnersListing(filterQuery: any) {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ isDeleted: false });
            and_clauses.push(filterQuery)
            // and_clauses.push({ createdAt: { $gte: new Date(moment().startOf('day').format()) } });

            conditions['$and'] = and_clauses;

            // console.log('conditions1111111111111111111111111', conditions)

            const aggregate = await this.gameCurrentModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'orders',
                        let: { currentGameId: '$_id', winnerStatus: '$winnerStatus' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: [{ $toObjectId: '$gameId' }, '$$currentGameId'] },
                                            { $eq: ['$betFor', '$$winnerStatus'] },
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    walletId: 1,
                                    tradeAmount: 1,
                                    betFor: 1
                                }
                            }
                        ],
                        as: 'orders_lookup_data'
                    }
                },
                {
                    $unwind: {
                        preserveNullAndEmptyArrays: false,
                        path: '$orders_lookup_data'
                    }
                },
                // {
                //     $addFields: {
                //         walletId: '$orders_lookup_data.walletId',
                //         tradeAmount: '$orders_lookup_data.tradeAmount'
                //     }
                // },
                {
                    $lookup: {
                        from: 'users',
                        let: { walletId: '$orders_lookup_data.walletId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$walletId', '$$walletId'] },
                                            { $eq: ['$isDeleted', false] },
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    country: 1,
                                    profile_image: 1
                                }
                            }
                        ],
                        as: 'user_lookup_data'
                    }
                },
                { $unwind: '$user_lookup_data' },
                {
                    $project: {
                        walletId: '$orders_lookup_data.walletId',
                        tradeAmount: '$orders_lookup_data.tradeAmount',
                        country: '$user_lookup_data.country',
                        betFor: '$orders_lookup_data.betFor',
                        profile_image: '$user_lookup_data.profile_image',
                        gameType: '$gameType',
                        orders_lookup_data: "$orders_lookup_data",
                        orderId: '$orders_lookup_data._id',
                    }
                },
                // { $sort: { orderId: -1 } },
                { $limit: 20 }
            ])
            // console.log(aggregate, "aggregateaggregateaggregateaggregate")
            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }


    async getRecentTopFiveListing(filterQuery: any) {
        try {
            let conditions = {};
            let and_clauses = [];

            and_clauses.push({ isDeleted: false });
            and_clauses.push(filterQuery)
            // and_clauses.push({ createdAt: { $gte: new Date(moment().startOf('day').format()) } });

            conditions['$and'] = and_clauses;

            const aggregate = await this.gameCurrentModel.aggregate([
                { $match: conditions },
                {
                    $lookup: {
                        from: 'orders',
                        let: { currentGameId: '$_id', winnerStatus: '$winnerStatus' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: [{ $toObjectId: '$gameId' }, '$$currentGameId'] },
                                            { $eq: ['$betFor', '$$winnerStatus'] },
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    walletId: 1,
                                    tradeAmount: 1,
                                    betFor: 1
                                }
                            },
                            { $sort: { "tradeAmount": -1 } },

                        ],
                        as: 'orders_lookup_data'
                    }
                },
                {
                    $unwind: {
                        preserveNullAndEmptyArrays: false,
                        path: '$orders_lookup_data'
                    }
                },
                // {
                //     $addFields: {
                //         walletId: '$orders_lookup_data.walletId',
                //         tradeAmount: '$orders_lookup_data.tradeAmount'
                //     }
                // },
                {
                    $lookup: {
                        from: 'users',
                        let: { walletId: '$orders_lookup_data.walletId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$walletId', '$$walletId'] },
                                            { $eq: ['$isDeleted', false] },
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    profile_image: 1,
                                    country: 1
                                }
                            }
                        ],
                        as: 'user_lookup_data'
                    }
                },
                { $unwind: '$user_lookup_data' },
                {
                    $project: {
                        walletId: '$orders_lookup_data.walletId',
                        tradeAmount: '$orders_lookup_data.tradeAmount',
                        country: '$user_lookup_data.country',
                        betFor: '$orders_lookup_data.betFor',
                        profile_image: '$user_lookup_data.profile_image',
                        gameType: '$gameType',
                    }
                },
                // { $sort: { tradeAmount: -1 } },
                { $limit: 5 }
            ])

            return aggregate;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async currentGameCreate(data: any): Promise<GameCurrentDocument> {
        try {
            console.log("Game Created")
            return await this.gameCurrentModel.create(data)
        }
        catch (error) {
            console.log("ERRORGAMECREATE0455", error)
            throw new InternalServerErrorException(error.message);
        }
    }
    async findAndUpdateGame(data: any): Promise<GameCurrentDocument> {
        try {
            console.log("findAndUpdateGame", data)
            const filter = { gameType: data.gameType };
            const updateFields = { $set: data }
            return await this.gameCurrentModel.findOneAndUpdate(filter, updateFields, { new: true });



        }
        catch (error) {
            console.log("ERRORGAMECREATE0455", error)
            throw new InternalServerErrorException(error.message);
        }
    }
    async findGame(data: any): Promise<GameCurrentDocument> {
        try {
            console.log("Find Game")

            const filter = { gameType: data.gameType };

            return await this.gameCurrentModel.findOne(filter).sort({ _id: -1 }).lean()

        }
        catch (error) {
            console.log("ERRORGAMECREATE0455", error)
            throw new InternalServerErrorException(error.message);
        }
    }
}