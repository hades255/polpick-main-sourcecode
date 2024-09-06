import { IOrder } from "../../interface/Order";
import { OrderModel } from "../schema/order";
import moment from 'moment';

class OrderRepository {
    private model: typeof OrderModel;
    constructor() {
        this.model = OrderModel;
    }

    async getOrderDetail(filterParam: Partial<IOrder>): Promise<IOrder[]> {
        try {
            let conditions: any = {};
            let and_clauses: any[] = [];

            and_clauses.push({ isDeleted: false, status: 'complete' });
            and_clauses.push(filterParam)

            conditions['$and'] = and_clauses;
            return await this.model.aggregate([
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
                                        ]
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
                        username: { $ifNull: ['$user_lookup_data.username', ''] },
                        profile_image: { $ifNull: ['$user_lookup_data.profile_image', ''] },
                        poolId: '$poolId',
                        gameId: '$gameId',
                        gameType: '$gameType',
                        walletId: '$walletId',
                        betFor: '$betFor',
                        tradeAmount: '$tradeAmount',
                        totalDeduction: '$totalDeduction',
                        serviceFee: '$serviceFee',
                        jackpotAmount: '$jackpotAmount',
                        websiteShare: '$websiteShare',
                        referralEarning: '$referralEarning',
                        referralAmount: '$referralAmount',
                        affiliate_link: '$affiliate_link',
                        netTradeAmount: '$netTradeAmount',
                        winningAmount: '$winningAmount',
                        status: '$status',
                        isDeleted: '$isDeleted',
                    }
                }
            ])
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    /* For Fetching The Jackpot Amount Which Has Been Accumulated In A Month For The Current Month Only */
    async getWeeklyJackpotAmount() {
        try {
            let conditions: any = {};
            let and_clauses: any = [];

            and_clauses.push({ isDeleted: false, createdAt: { $gte: new Date(moment().startOf('week').format()) } });

            conditions['$and'] = and_clauses;
            const aggregate = await this.model.aggregate([
                { $match: conditions },
                {
                    $group: {
                        _id: null,
                        totalJackpotAmount: { $sum: '$jackpotAmount' }
                    }
                }
            ])

            if (!aggregate.length) return 0;
            return aggregate[0]?.totalJackpotAmount;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default new OrderRepository();