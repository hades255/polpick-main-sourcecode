import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export type TradingPriceDocument = mongoose.HydratedDocument<TradingPrice>;

@Schema({ timestamps: true, versionKey: false, collection: "trading_prices" })
export class TradingPrice {
  @Prop({ type: String, default: "" })
  e: string;

  @Prop({ type: Number, default: 0 })
  E: number;

  @Prop({ type: String, default: "" })
  s: string;

  @Prop({ type: Number, default: 0 })
  t: number;

  @Prop({ type: String, default: "" })
  p: string;

  @Prop({ type: String, default: "" })
  q: string;

  @Prop({ type: Number, default: 0 })
  b: number;

  @Prop({ type: Number, default: 0 })
  a: number;

  @Prop({ type: Number, default: 0, index: true })
  T: number;

  @Prop({ type: Boolean, default: false })
  m: boolean;

  @Prop({ type: Boolean, default: true })
  M: boolean;
}
export const tradingSchema = SchemaFactory.createForClass(TradingPrice);
tradingSchema.plugin(aggregatePaginate);

// Create an index on the T field
tradingSchema.index({ T: 1 });
