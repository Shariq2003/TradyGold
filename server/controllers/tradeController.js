const Trade = require("../models/Trade");
const User = require("../models/User");

const getTradeData = async (req, res) => {
    try {
        let trade = await Trade.findOne({ userId: req.user._id });
        const user = await User.findById(req.user._id);
        if (!trade) {
            trade = await Trade.create({
                userId: req.user._id,
                goldAvailable: 0,
                goldBought: 0,
                goldSold: 0,
                portfolio: 0,
            });
            if (user.balance === undefined || user.balance === null) {
                user.balance = 100;
                await user.save();
            }
        }

        const tradeWithBalance = trade.toObject();
        tradeWithBalance.balance = user.balance;

        res.status(200).json(tradeWithBalance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const buyGold = async (req, res) => {
    const { quantity, amount } = req.body;

    try {
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let trade = await Trade.findOne({ userId: req.body.userId });
        if (!trade) trade = new Trade({ userId: req.body.userId });

        user.balance -= amount;
        trade.goldAvailable += quantity;
        trade.goldBought += quantity;

        await user.save();
        await trade.save();

        res.status(200).json({ trade, balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sellGold = async (req, res) => {
    try {
        const quantity = parseFloat(req.body.quantity ?? 0);
        const amount = parseFloat(req.body.amount ?? 0);

        if (isNaN(quantity) || isNaN(amount)) {
            return res.status(400).json({ message: "Invalid quantity or amount" });
        }

        const user = await User.findById(req.user._id);
        const trade = await Trade.findOne({ userId: req.user._id });

        if (!user || !trade) return res.status(404).json({ message: "Data not found" });

        if (trade.goldAvailable < quantity) {
            return res.status(400).json({ message: "Not enough gold to sell" });
        }

        trade.goldAvailable -= quantity;
        trade.goldSold += quantity;
        user.balance += amount;

        await trade.save();
        await user.save();

        res.status(200).json({ trade, balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getTradeData,
    buyGold,
    sellGold,
};
