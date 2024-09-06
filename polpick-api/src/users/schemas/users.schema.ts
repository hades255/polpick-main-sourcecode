import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

export type UsersDocument = mongoose.HydratedDocument<Users>;

@Schema({ timestamps: true, versionKey: false })
export class Users {
    @Prop({ type: String, default: '', index: true })
    username: string;

    @Prop({ type: String, default: '', index: true })
    full_name: string;

    @Prop({ type: String, default: '', index: true })
    walletId: string;

    @Prop({ type: String, default: 'GB', index: true })
    country: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role', index: true })
    role: string | Types.ObjectId;

    @Prop({ type: String, default: '', index: true })
    email: string;

    @Prop({ type: String, default: '', index: true })
    phone: string;

    @Prop({ type: String, default: '', index: true })
    otp: string;

    @Prop({ type: Date, default: null, index: true })
    otpExpirationTime: Date;

    @Prop({ type: Boolean, default: false, index: true })
    isOtpVerified: boolean;

    @Prop({ type: String, default: '', index: true })
    countryCode: string;

    @Prop({ type: String, default: '', index: true })
    password: string;

    @Prop({ type: String, default: '', index: true })
    profile_image: string;

    @Prop({ type: String, default: 'Normal', enum: ['Normal', 'Apple', 'Google'], index: true })
    signupType: string;

    @Prop({ type: [{ socialId: { type: String }, platform: { type: String, enum: ['Google', 'Apple'] } }] })
    socialAccounts: { socialId: string; platform: string }[];

    @Prop({ type: String, default: '' })
    social_link: string;

    @Prop({ type: String, default: '' })
    whiteLabelId: string;

    @Prop({ type: Boolean, default: false, index: true })
    isAffiliateManager: boolean;

    @Prop({ type: String, default: '', index: true })
    referral_link: string;

    @Prop({ type: String, default: '', index: true })
    referrerWalletId: string;

    @Prop({ type: Boolean, default: false, index: true })
    isAffiliateUser: boolean;

    @Prop({ type: String, default: '', index: true })
    telegramId: string;

    /** START USER PLAYED GAME DATA */
    @Prop({ type: Number, default: 0, index: true })
    betsCount: number;

    @Prop({ type: Number, default: 0, index: true })
    winningCount: number;

    @Prop({ type: Number, default: 0, index: true })
    winStreakCount: number;

    @Prop({ type: Boolean, default: false })
    firstTrade: boolean;
    /** END USER PLAYED GAME DATA */

    @Prop({ type: Date, default: Date.now(), index: true })
    lastOnline: Date;

    @Prop({ type: Date, default: Date.now(), index: true })
    lastWalletConnected: Date;

    @Prop({ type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true })
    status: string;

    @Prop({ type: Boolean, default: false, index: true })
    isDeleted: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
UsersSchema.plugin(aggregatePaginate);