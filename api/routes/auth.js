const express = require("express");
const router = express.Router();
const {
  generateToken,
  addToken,
  checkToken,
  search,
} = require("../controllers/auth_controller");
require("dotenv").config();
const CLIENT_ID = "a529f43539e843a19e4abb5a5697315e";
const REDIRECT_URI = "http://localhost:8000/auth/callback";

router.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
});

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const token = await generateToken(REDIRECT_URI, CLIENT_ID, code);
  if (token.access_token) {
    addToken(token);
    res.redirect("http://localhost:5173/results");
  }
});

router.get("/status", (req, res) => {
  checkToken(req, res);
});

router.post("/search", (req, res) => {
  search(req, res);
});

module.exports = router;
