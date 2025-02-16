require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
