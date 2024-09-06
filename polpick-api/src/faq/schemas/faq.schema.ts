import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type FAQDocument = mongoose.HydratedDocument<FAQ>;


@Schema({ timestamps: true, versionKey: false })
export class FAQ {
    @Prop({ type: String, default: '', index: true })
    title: string;

    @Prop({ type: String, default: '', index: true })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'FAQCategory', index: true })
    category_id: string | Types.ObjectId;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const FAQSchema = SchemaFactory.createForClass(FAQ);
FAQSchema.plugin(aggregatePaginate);
