import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserRole } from "src/common/enums/user-role.enum";
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export type UserDeviceDocument = HydratedDocument<UserDevice>;

const schemaOptions = { timestamps: false, versionKey: false };
@Schema(schemaOptions)
class AdditionalDetails {
    @Prop({ type: String, default: '' })
    name: string
    @Prop({ type: String, default: '' })
    version: string
}

@Schema(schemaOptions)
class BrowserInfo extends AdditionalDetails { }

@Schema(schemaOptions)
class OperatingSystemInfo extends AdditionalDetails { }

@Schema(schemaOptions)
class DeviceInfo {
    @Prop({ type: String, default: '' })
    vendor: string
    @Prop({ type: String, default: '' })
    model: string
    @Prop({ type: String, default: '' })
    type: string
}

@Schema({ versionKey: false, timestamps: true })
export class UserDevice {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true })
    user_id: string | mongoose.Types.ObjectId

    @Prop({ type: String, default: '' })
    deviceToken: string

    @Prop({ type: String, default: 'Web', enum: ["Web", "Android", "iOS"], index: true })
    deviceType: string

    @Prop({ type: String, default: '' })
    ip: string

    @Prop({ type: String, default: '' })
    ip_lat: string

    @Prop({ type: String, default: '' })
    ip_long: string

    @Prop({ type: BrowserInfo })
    browserInfo: { name: string, version: string }

    @Prop({ type: DeviceInfo })
    deviceInfo: { vendor: string, model: string, type: string }

    @Prop({ type: OperatingSystemInfo })
    operatingSystem: { name: string, version: string }

    @Prop({ type: Date, default: null, index: true })
    last_active: any

    @Prop({ type: String, default: '' })
    state: string

    @Prop({ type: String, default: '' })
    country: string

    @Prop({ type: String, default: '' })
    city: string

    @Prop({ type: String, default: '' })
    timezone: string

    @Prop({ type: String, default: '', /* unique: true, index: true */ })
    access_token: string

    @Prop({ type: Boolean, default: false })
    expired: boolean

    @Prop({ type: String, enum: UserRole, index: true })
    role: string

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean
}

export const UserDeviceSchema = SchemaFactory.createForClass(UserDevice);
UserDeviceSchema.plugin(aggregatePaginate);