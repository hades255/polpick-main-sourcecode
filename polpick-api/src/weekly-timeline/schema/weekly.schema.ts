import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type WeeklyDoc = mongoose.HydratedDocument<Weekly>;



@Schema({ timestamps: true, versionKey: false })
export class Weekly {

    @Prop({type: String, default: "", index: true}) 
    avatarUrl:string;
    
   @Prop({type: String, default: "", index: true}) 
    walletId: string;

    @Prop({type: Number, default: "", index: true}) 
    total_ticket: number;

    @Prop({type: Number, default: "", index: true}) 
    prize_ticket: number;
 
    @Prop({ type: Boolean, default: false, index: true})
    isDeleted: boolean

}

export const WeeklySchema = SchemaFactory.createForClass(Weekly);
WeeklySchema.plugin(aggregatePaginate);