import mongoose from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const OrderSchema = new mongoose.Schema({
    affiliate_link: { type: String, default: null },
    poolId: { type: String, index: true },
    gameId: { type: String, index: true },
    gameType: { type: String, enum: ["30", "15"], index: true },
    walletId: { type: String, default: '' },
    betFor: { type: String, enum: ['up', 'down'] },
    tradeAmount: { type: Number, default: 0 },
    totalDeduction: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    jackpotAmount: { type: Number, default: 0 },
    websiteShare: { type: Number, default: 0 },
    referralEarning: { type: Number, default: 0 },
    referralAmount: { type: Number, default: 0 },
    netTradeAmount: { type: Number, default: 0 },
    winningAmount: { type: Number, default: 0 },
    status: { type: String, default: 'pending', enum: ['pending', 'complete'] },
    isDeleted: { type: Boolean, default: false }
});

const OrderModel = mongoose.model('Order', OrderSchema);
OrderSchema.plugin(aggregatePaginate);
export { OrderModel, OrderSchema };