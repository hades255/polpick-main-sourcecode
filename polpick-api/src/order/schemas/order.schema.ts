import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type OrderDocument = mongoose.HydratedDocument<Orders>;

@Schema({ timestamps: true, versionKey: false })
export class Orders {
    @Prop({ type: String, default: "" })
    affiliate_link: string;

    @Prop({ type: String })
    poolId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
    gameId: string | Types.ObjectId;

    @Prop({ type: String, default: "", index: true })
    referrerWalletId: string;

    @Prop({ type: String, enum: ["30", "15"], index: true })
    gameType: string;

    @Prop({ type: String, default: '', index: true })
    walletId: string;

    @Prop({ type: String, enum: ['up', 'down'], index: true })
    betFor: string;

    /* Total User Trade Amount */
    @Prop({ type: Number, default: 0 })
    tradeAmount: number;

    /* Total Trade Amount After Deductions */
    @Prop({ type: Number, default: 0 })
    netTradeAmount: number;

    /* Deductions & Commissions & Referral Amounts */
    @Prop({ type: Number, default: 0 })
    totalDeduction: number;

    /* Total Service Fee On 11% Of Trade Amount */
    @Prop({ type: Number, default: 0 })
    serviceFee: number;

    /* Total Jackpot Fee On 11% Of Trade Amount */
    @Prop({ type: Number, default: 0 })
    jackpotAmount: number;

    /* Total Platform Fee On 11% Of Trade Amount */
    @Prop({ type: Number, default: 0 })
    websiteShare: number;

    /* Total Referral Fee On 11% Of Trade Amount */
    @Prop({ type: Number, default: 0 })
    referralAmount: number;

    /* Total Expected Game Winning Amount */
    @Prop({ type: Number, default: 0 })
    winningAmount: number;

    @Prop({ type: String, default: '', enum: ['pending', 'complete'], index: true })
    status: string;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
OrderSchema.plugin(aggregatePaginate);

