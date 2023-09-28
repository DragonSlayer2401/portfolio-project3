const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Database Connection Established"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
