import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type GameCurrentDocument = mongoose.HydratedDocument<GameCurrent>;

@Schema({ timestamps: true, versionKey: false })
export class GameCurrent {
    @Prop({ type: String })
    gameId: string;

    @Prop({ type: String })
    poolId: string;

    @Prop({ type: String, index: true })
    batchSize: string;

    @Prop({ type: String, enum: ["30", "15"] })
    gameType: string;

    @Prop({ type: String, index: true })
    gameTimeStart: string;

    @Prop({ type: String, index: true })
    gameTimeEnd: string;

    @Prop({ type: Number, default: 0, index: true })
    start_price: number;

    @Prop({ type: Number, default: 0, index: true })
    end_price: number;

    @Prop({ type: String, default: 'draw', enum: ['draw', 'up', 'down'] })
    winnerStatus: string;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const GameCurrentSchema = SchemaFactory.createForClass(GameCurrent);
GameCurrentSchema.plugin(aggregatePaginate);



