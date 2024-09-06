import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type UserActivityTimelineDocument = HydratedDocument<UserActivityTimeline>;

@Schema({ timestamps: true, versionKey: false })
export class UserActivityTimeline {
    @Prop({ type: String, default: '' })
    user_id: Users | Types.ObjectId

    @Prop({ type: String, default: '' })
    title: string

    @Prop({ type: String, default: '' })
    description: string

    @Prop({ type: String, default: '' })
    file_full_path: string

    @Prop({ type: String, default: 'Active', enum: ['Active', 'Inactive'] })
    status: string;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;
}

export const UserActivityTimelineSchema = SchemaFactory.createForClass(UserActivityTimeline);
UserActivityTimelineSchema.plugin(aggregatePaginate);