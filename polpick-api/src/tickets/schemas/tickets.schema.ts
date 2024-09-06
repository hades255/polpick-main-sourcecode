import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type TicketDocument = mongoose.HydratedDocument<Ticket>;

@Schema({ timestamps: true, versionKey: false })
export class Ticket {
    @Prop({ type: String, default: '', index: true })
    walletId: string;

    @Prop({ type: Number, default: 0, index: true })
    tickets: number;

    @Prop({
        type: String, required: true, enum: [
            'fiveBets',
            'fiveWins',
            'fiveWinsStreak',
            'tenWinsStreak',
            'twentyWinsStreak',
            'fortyWinsStreak',
            'firstTrade',
            'winRatio',
            'highRollerRatio'
        ]
    })
    type: string;

    @Prop({ type: Date, default: Date.now(), index: true })
    date?: Date;

    @Prop({ type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true })
    status?: string;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted?: boolean;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
TicketSchema.plugin(aggregatePaginate);