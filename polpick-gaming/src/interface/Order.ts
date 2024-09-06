import { Types } from "mongoose"

export interface IOrder {
    affiliate_link: string
    poolId: string
    gameId: string | Types.ObjectId
    gameType: string
    walletId: string
    betFor: string
    tradeAmount: number
    totalDeduction: number
    serviceFee: number
    jackpotAmount: number
    websiteShare: number
    referralEarning: number
    referralAmount: number
    netTradeAmount: number
    winningAmount: number
    status: string
    isDeleted: Boolean
    createdAt: string
    updatedAt: string

    [key: string]: any;
}