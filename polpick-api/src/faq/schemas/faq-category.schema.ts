import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type FAQCategoryDocument = mongoose.HydratedDocument<FAQCategory>;


@Schema({ timestamps: true, versionKey: false })
export class FAQCategory {
    @Prop({ type: String, default: '', index: true })
    title: string;

    @Prop({ type: String, default: '', index: true })
    slug: string;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const FAQCategorySchema = SchemaFactory.createForClass(FAQCategory);
FAQCategorySchema.plugin(aggregatePaginate);
