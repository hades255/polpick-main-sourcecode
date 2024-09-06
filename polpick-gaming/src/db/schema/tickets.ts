import mongoose from "mongoose";
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const TicketSchema = new mongoose.Schema({
    walletId: { type: String, default: '', index: true },
    tickets: { type: Number, default: 0, index: true },
    type: {
        type: String, required: true, enum: [
            'fiveBets',
            'fiveWins',
            'fiveWinsStreak',
            'tenWinsStreak',
            'twentyWinsStreak',
            'fortyWinsStreak',
            'firstTrade',
        ]
    },
    date: { type: Date, default: Date.now(), index: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', index: true },
    isDeleted: { type: Boolean, default: false, index: true },
});

const TicketModel = mongoose.model('Ticket', TicketSchema);
TicketSchema.plugin(aggregatePaginate);
export { TicketModel, TicketSchema };