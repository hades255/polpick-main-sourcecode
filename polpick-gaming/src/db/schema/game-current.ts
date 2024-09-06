// const mongoose = require('mongoose');
import mongoose from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const GameCurrentSchema = new mongoose.Schema({
    gameId: { type: String, index: true },
    poolId: { type: String, index: true },
    batchSize: { type: String, index: true },
    gameType: { type: String, enum: ["30", "15"], index: true },
    start_price: { type: Number, default: 0 },
    end_price: { type: Number, default: 0 },
    winnerStatus: { type: String, default: 'draw', enum: ['draw', 'up', 'down'] },
    gameTimeStart: { type: Number, index: true },
    gameTimeEnd: { type: Number, index: true },
    isDeleted: { type: Boolean, default: false, index: true },
}, { timestamps: true, versionKey: false });

GameCurrentSchema.plugin(aggregatePaginate);

export const GameCurrentModel = mongoose.model('GameCurrent', GameCurrentSchema);