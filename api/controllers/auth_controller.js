const axios = require("axios");
const querystring = require("querystring");
require("dotenv").config();

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

module.exports = { generateToken };
