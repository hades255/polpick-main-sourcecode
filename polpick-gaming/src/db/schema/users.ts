import mongoose from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const UsersSchema = new mongoose.Schema({
    username: { type: String, default: '', index: true },
    full_name: { type: String, default: '', index: true },
    walletId: { type: String, default: '', index: true },
    country: { type: String, default: '' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', index: true },
    email: { type: String, default: '', index: true },
    phone: { type: String, default: '', index: true },
    countryCode: { type: String, default: '' },
    password: { type: String, default: '' },
    profile_image: { type: String, default: '' },
    signupType: { type: String, default: 'Normal', enum: ['Normal', 'Apple', 'Google'] },
    socialAccounts: { type: [{ socialId: { type: String }, platform: { type: String, enum: ['Google', 'Apple'] } }] },
    social_link: { type: String, default: '' },
    whiteLabelId: { type: String, default: '' },
    isAffiliateManager: { type: Boolean, default: false, index: true },
    referral_link: { type: String, default: '' },
    telegramId: { type: String, default: '' },
    betsCount: { type: Number, default: 0 },
    winningCount: { type: Number, default: 0, index: true },
    winStreakCount: { type: Number, default: 0 },
    firstTrade: { type: Boolean, default: false },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    isDeleted: { type: Boolean, default: false },
});

const UsersModel = mongoose.model('User', UsersSchema);
UsersSchema.plugin(aggregatePaginate);
export { UsersModel, UsersSchema };