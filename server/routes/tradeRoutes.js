const express = require("express");
const router = express.Router();
const {
    getTradeData,
    buyGold,
    sellGold,
} = require("../controllers/tradeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getTradeData);
router.post("/buy", buyGold);
router.post("/sell", authMiddleware, sellGold);

module.exports = router;
