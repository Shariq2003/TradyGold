require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const tradeRoutes = require("./routes/tradeRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trade", tradeRoutes);

app.get("/", (req, res) => {
    res.send("TradyGold API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
