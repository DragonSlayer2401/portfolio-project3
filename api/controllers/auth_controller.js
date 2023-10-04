const axios = require("axios");
const querystring = require("querystring");
const Token = require("../models/token");
require("dotenv").config();
const CLIENT_ID = "a529f43539e843a19e4abb5a5697315e";
const REDIRECT_URI = "http://localhost:8000/auth/callback";

const generateToken = async (URI, CLIENT_ID, code) => {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    data: querystring.stringify({
      code: code,
      redirect_uri: URI,
      grant_type: "authorization_code",
    }),
  });
  return response.data;
};

const addToken = (token) => {
  Token.find()
    .exec()
    .then((tokens) => {
      if (tokens.length === 0) {
        new Token({
          token: token.access_token,
          refreshToken: token.refresh_token,
          tokenExpires: Date.now() + token.expires_in * 1000,
        })
          .save()
          .then((data) => console.log("new token created"));
      }
    });
};

const checkToken = (req, res) => {
  Token.find()
    .exec()
    .then(async (token) => {
      if (token.length > 0) {
        const currentTime = Date.now();
        const expired = currentTime - token[0].tokenExpires;
        if (expired >= 0) {
          const refresh = token[0].refreshToken;
          const response = await axios({
            method: "post",
            url: "https://accounts.spotify.com/api/token",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${Buffer.from(
                `${CLIENT_ID}:${process.env.CLIENT_SECRET}`
              ).toString("base64")}`,
            },
            data: querystring.stringify({
              grant_type: "refresh_token",
              refresh_token: refresh,
            }),
          });

          const newToken = {
            token: response.data.access_token,
            refreshToken: refresh,
            tokenExpires: response.data.expires_in * 1000 + Date.now(),
          };

          console.log(token[0])

          Token.updateOne(
            {
              _id: token[0]._id,
            },
            {
              $set: newToken,
            }
          )
          .then((data) => {
            res
              .status(200)
              .json({ success: true, message: "token updated successfully" });
          });
        } 
        else {
          res
            .status(200)
            .json({ success: true, message: "token is still valid" });
        }
      }
    });
};

module.exports = { generateToken, addToken, checkToken };
