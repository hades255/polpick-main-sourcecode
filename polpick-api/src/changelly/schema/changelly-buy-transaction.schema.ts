import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export type ChangellyBuyTransactionDocument =  HydratedDocument<ChangellyBuyTransactions>;

@Schema({ timestamps: true, versionKey: false })
export class ChangellyBuyTransactions {
  @Prop({ type: String, required: true, index: true })
  externalUserId: string;

  @Prop({ type: String, required: true, index: true })
  orderId: string;

  @Prop({ type: String, required: true })
  externalOrderId: string;

  @Prop({ type: String, required: true, index: true })
  type: string;

  @Prop({ type: String, required: true, index: true })
  providerCode: string;

  @Prop({ type: String, required: true, index: true })
  currencyFrom: string;

  @Prop({ type: String, required: true, index: true })
  currencyTo: string;

  @Prop({ type: String, required: true })
  amountFrom: string;

  @Prop({ type: String, required: true, index: true })
  country: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  ip: string;

  @Prop({ type: String, required: true })
  walletAddress: string;

  @Prop({ type: String, required: true })
  walletExtraId: string;

  @Prop({ type: String })
  refundAddress: string;

  @Prop({ type: String, required: true, index: true })
  paymentMethod: string;

  @Prop({ type: String })
  userAgent: string;

  @Prop({ type: String })
  metadata: string;

  @Prop({ type: String })
  payinAmount: string;

  @Prop({ type: String })
  payoutAmount: string;

  @Prop({ type: String })
  payinCurrency: string;

  @Prop({ type: String })
  payoutCurrency: string;

  @Prop({ type: String, required: true })
  redirectUrl: string;

  @Prop({ type: String, required: true, default: "created", index: true })
  status: string;

  @Prop({ type: Object })
  paymentPayload: object;
}

export const ChangellyBuyTransactionSchema = SchemaFactory.createForClass(
  ChangellyBuyTransactions
);
ChangellyBuyTransactionSchema.plugin(aggregatePaginate);
