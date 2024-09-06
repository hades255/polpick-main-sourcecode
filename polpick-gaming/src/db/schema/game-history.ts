import mongoose from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const GameUserObjectSchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    amount: { type: Number, default: 0 },
    betFor: { type: String, enum: ['up', 'down'] },
    isWin: { type: Boolean, default: false },
    walletAddress: { type: String, default: '' }
});

const GameHistorySchema = new mongoose.Schema({
    poolId: { type: String, index: true },
    gameId: { type: String, default: '', index: true },
    gameType: { type: String, enum: ["30", "15"], index: true },
    gameStartTme: { type: String, default: '', index: true },
    gameEndTme: { type: String, default: '' },
    gameStartPrice: { type: String, default: '' },
    gameEndPrice: { type: String, default: '' },
    prizeAmount: { type: Number, default: 0 },
    result: { type: String, enum: ['up', 'down'] },
    batchSize: { type: Number, default: 0 },
    usersData: [GameUserObjectSchema],
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });

GameHistorySchema.plugin(aggregatePaginate);

export const GameHistoryModel = mongoose.model('GameHistory', GameHistorySchema);