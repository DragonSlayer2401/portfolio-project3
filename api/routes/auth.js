const express = require("express");
const router = express.Router();
require("dotenv").config();
const CLIENT_ID = "a529f43539e843a19e4abb5a5697315e";
const REDIRECT_URI = "http://localhost:8000/auth/callback";

router.get("/login", (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  );
});

router.get("/callback", (req, res) => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: req.query.code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString(
          "base64"
        ),
    },
    json: true,
  };
});

module.exports = router;
