import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type GameHistoryDocument = mongoose.HydratedDocument<GameHistory>;

@Schema({ timestamps: true, versionKey: false })
class GameUserObject {
  @Prop({ type: String, default: '' })
  userId: string | Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop({ type: String, enum: ['up', 'down'] })
  betFor: string;

  @Prop({ type: String, default: '' })
  isWin: boolean;

  @Prop({ type: String, default: '' })
  walletAddress: string;
}

@Schema({ timestamps: true, versionKey: false })
export class GameHistory {
  @Prop({ type: String, index: true })
  poolId: string

  @Prop({ type: String, default: "", index: true })
  gameId: string;

  @Prop({ type: String, enum: ["30", "15"], index: true })
  gameType: string

  @Prop({ type: String, default: "", index: true })
  gameStartTme: string;

  @Prop({ type: String, default: '', index: true })
  gameEndTme: string;

  @Prop({ type: String, default: '', index: true })
  gameStartPrice: string;

  @Prop({ type: String, default: '', index: true })
  gameEndPrice: string;

  @Prop({ type: Number, default: 0, index: true })
  prizeAmount: number;

  @Prop({ type: String, enum: ['up', 'down'], index: true })
  result: string;

  @Prop({ type: Number, default: 0, index: true })
  batchSize: number;

  @Prop({ type: [GameUserObject], index: true })
  usersData: GameUserObject[];

  @Prop({ type: Boolean, default: false, index: true })
  isDeleted: boolean;
}

export const GameHistorySchema = SchemaFactory.createForClass(GameHistory);
GameHistorySchema.plugin(aggregatePaginate);


