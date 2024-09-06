import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
    @Prop({ type: String, required: true, index: true })
    gameId: string;

    @Prop({ type: String, required: true, index: true })
    walletId: string;

    @Prop({ type: Number, required: true })
    amount: number;

    @Prop({ type: String, required: true, enum: ['top-up', 'trade'] })
    type: string;

    @Prop({ type: String, enum: ['swap', 'credit_card'] })
    topUpType: string;

    paymentDetails: any

    @Prop({ type: Date, required: true, default: Date.now() })
    date: Date;

    @Prop({ type: String, required: true, enum: ['pending', 'completed', 'failed'] })
    status: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.plugin(aggregatePaginate);