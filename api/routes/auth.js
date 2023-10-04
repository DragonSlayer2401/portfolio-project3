const express = require("express");
const router = express.Router();
const Token = require("../models/token");
const { generateToken } = require("../controllers/auth_controller");
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
    res
      .status(200)
      .json({ message: "token generated successfully", success: true });
    Token.find()
      .exec()
      .then((tokens) => {
        if (tokens.length === 0) {
          new Token({
            token: token.access_token,
            refreshToken: token.refresh_token,
            tokenExpires: Date.now() + token.expires_in,
          })
            .save()
            .then((data) => console.log("new token created"));
        }
      });
  }
});

module.exports = router;
