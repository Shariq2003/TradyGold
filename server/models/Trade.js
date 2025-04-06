const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    goldAvailable: {
        type: Number,
        default: 0,
    },
    goldBought: {
        type: Number,
        default: 0,
    },
    goldSold: {
        type: Number,
        default: 0,
    },
    portfolio: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);
