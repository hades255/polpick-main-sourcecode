import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type CMSDocument = mongoose.HydratedDocument<Cms>;

@Schema({ timestamps: true, versionKey: false })
class CmsObject {
    @Prop({ type: String, default: '' })
    title: string;

    @Prop({ type: String, default: '' })
    win_ratio: string;
  
    @Prop({ type: Boolean, default: '' })
    winning_withdraw: string;
  
    @Prop({ type: String, default: '' })
    against_house: boolean;

    @Prop({ type: String, default: '' })
    win_chance: boolean;

    @Prop({ type: String, default: '' })
    peer: boolean;
    
    @Prop({ type: String, default: '' })
    transparency: boolean;

    @Prop({ type: String, default: '' })
    walletAddress: string;
  }

  @Schema({ timestamps: true, versionKey: false })

  class TopWinners {
    @Prop({type: String, default: ''})
    rank: string;

    @Prop({ type: String, default: '' })
    walletId: string;

    @Prop({ type: String, default: '' })
    avatarUrl: string;
  
    @Prop({ type: String, default: '' })
    prize: string;
  

  }

@Schema({ timestamps: true, versionKey: false })
export class Cms {
    @Prop({ type: String, default: '', index: true })
    win_ratio: string;

    @Prop({ type: String, default: '', index: true })
    win_paid: string;

    @Prop({ type: String, default: '' })
    jackpot_paid: string;

    @Prop({ type: String, default: '' })
    video_link: string;

    @Prop({ type: [CmsObject] })
    CmsData: CmsObject[];

    @Prop({ type: [TopWinners] })
    TopWinnerData: TopWinners[];

    @Prop({ type: String, default: 'Active', enum: ['Active', 'Inactive'], index: true })
    status: string;

   

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const CmsSchema = SchemaFactory.createForClass(Cms);
CmsSchema.plugin(aggregatePaginate);
