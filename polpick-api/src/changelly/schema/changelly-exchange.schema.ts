import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type ChangellyDocument = HydratedDocument<ChangellyExchange>;

@Schema({ timestamps: true, versionKey: false })
export class ChangellyExchange {
    @Prop({ type: String, required: true })
    id: string;
  
    @Prop({ type: String, required: true })
    trackUrl: string;
  
    @Prop({ type: Number, required: true })
    createdAt: number;
  
    @Prop({ type: String, required: true })
    type: string;
  
    @Prop({ type: Number, required: true })
    moneyReceived: number;
  
    @Prop({ type: Number, required: true })
    moneySent: number;
  
    @Prop({ type: String, required: true })
    rate: string;
  
    @Prop({ type: String, required: true })
    payinConfirmations: string;
  
    @Prop({ type: String, required: true })
    status: string;
  
    @Prop({ type: String, required: true })
    currencyFrom: string;
  
    @Prop({ type: String, required: true })
    currencyTo: string;
  
    @Prop({ type: String, required: true })
    payinAddress: string;
  
    @Prop({ type: String })
    payinExtraId: string;
  
    @Prop({ type: String })
    payinExtraIdName: string;
  
    @Prop({ type: String, required: true })
    payinHash: string;
  
    @Prop({ type: String, required: true })
    payoutHashLink: string;
  
    @Prop({ type: String })
    refundHashLink: string;
  
    @Prop({ type: String, required: true })
    amountExpectedFrom: string;
  
    @Prop({ type: String, required: true })
    payoutAddress: string;
  
    @Prop({ type: String })
    payoutExtraId: string;
  
    @Prop({ type: String })
    payoutExtraIdName: string;
  
    @Prop({ type: String, required: true })
    payoutHash: string;
  
    @Prop({ type: String })
    refundHash: string;
  
    @Prop({ type: String, required: true })
    refundAddress: string;
  
    @Prop({ type: String })
    refundExtraId: string;
  
    @Prop({ type: String, required: true })
    amountFrom: string;
  
    @Prop({ type: String, required: true })
    amountTo: string;
  
    @Prop({ type: String, required: true })
    amountExpectedTo: string;
  
    @Prop({ type: String, required: true })
    networkFee: string;
  
    @Prop({ type: String, required: true })
    changellyFee: string;
  
    @Prop({ type: String, required: true })
    apiExtraFee: string;
  
    @Prop({ type: String, required: true })
    totalFee: string;
  
    @Prop({ type: Boolean, required: true })
    canPush: boolean;
  
    @Prop({ type: Boolean, required: true })
    canRefund: boolean;

}

export const ChangellySchema = SchemaFactory.createForClass(ChangellyExchange);
ChangellySchema.plugin(aggregatePaginate);


