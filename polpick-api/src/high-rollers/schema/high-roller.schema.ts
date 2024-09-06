import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type RollerDoc = mongoose.HydratedDocument<Roller>;



@Schema({ timestamps: true, versionKey: false })
export class Roller {

    @Prop({type: String, default: "", index: true}) 
    avatarUrl:string;
    
    @Prop({type: String, default: "", index: true}) 
    country_code: string;

    @Prop({type: String, default: "", index: true}) 
    walletId: string;

    @Prop({type: Number, default: "", index: true}) 
    total_trade: number;

    @Prop({type: Number, default: "", index: true}) 
    turnover: number;

    @Prop({type: Number, default: "", index: true}) 
    ticket: number;

    @Prop({type: String, enum: ["up", "down"], index: true})
    type: string;
    
    @Prop({ type: Boolean, default: false, index: true})
    isDeleted: boolean

}

export const RollerSchema = SchemaFactory.createForClass(Roller);
RollerSchema.plugin(aggregatePaginate);