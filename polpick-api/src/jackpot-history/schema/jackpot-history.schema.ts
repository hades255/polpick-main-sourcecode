import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type JackpotHistoryDocument = mongoose.HydratedDocument<JackpotHistory>;

@Schema({ timestamps: true, versionKey: false })
export class JackpotHistory {
    @Prop({ type: String, default: '' })
    walletId: string;

    @Prop({ type: Number, default: '' })
    expected_prize: number;

    @Prop({ type: Number, default: '' })
    rank: number;

    @Prop({ type: Number, default: '' })
    total_tickets_count: number;

    @Prop({ type: Number, default: '' })
    total_trades_count: number;

    @Prop({ type: Date, default: Date.now() })
    result_date: Date;

    @Prop({ type: Date, default: Date.now() })
    week_start_date: Date;
    @Prop({ type: Date, default: Date.now() })
    week_end_date: Date;

    @Prop({ type: String, default: 'Active', enum: ['Active', 'Inactive'] })
    status: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const JackpotHistorySchema = SchemaFactory.createForClass(JackpotHistory);
JackpotHistorySchema.plugin(aggregatePaginate);


