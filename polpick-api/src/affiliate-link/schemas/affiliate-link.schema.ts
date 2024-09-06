import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type AffiliateLinkDocument = HydratedDocument<AffiliateLink>;

@Schema({ timestamps: true, versionKey: false })
export class AffiliateLink {
    @Prop({ type: String, index: true })
    walletId: string;
    
    @Prop({ type: String, index: true })
    link_name: string;

    @Prop({ type: String, index: true })
    affiliate_link: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const AffiliateLinkSchema = SchemaFactory.createForClass(AffiliateLink);
AffiliateLinkSchema.plugin(aggregatePaginate);