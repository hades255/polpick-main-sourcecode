import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type ClickDocument = HydratedDocument<Click>;

@Schema({ timestamps: true, versionKey: false })
export class Click {

    @Prop({ type: [String], default: [], index: true })
    ipv4: string[];

    @Prop({ type: [String], default: [], index: true })
    ipv6: string[];

    @Prop({ type: String, default: '', index: true })
    referrerWalletId: string;

    @Prop({ type: String, index: true })
    affiliate_link: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

}

export const ClickSchema = SchemaFactory.createForClass(Click);
ClickSchema.plugin(aggregatePaginate);
