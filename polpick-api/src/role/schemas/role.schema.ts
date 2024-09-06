import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const roleGroup = ['backend', 'frontend'];

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true, versionKey: false })
export class Role {
    @Prop({ type: String, required: true })
    role: string;

    @Prop({ type: String, required: true })
    roleDisplayName: string;

    @Prop({ type: String, default: 'backend', enum: roleGroup })
    roleGroup: string;

    @Prop({ type: String, default: '' })
    description: string;

    @Exclude()
    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.plugin(aggregatePaginate);