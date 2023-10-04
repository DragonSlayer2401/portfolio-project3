const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));

app.use("/auth", authRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
