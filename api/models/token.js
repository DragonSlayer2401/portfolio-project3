const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    tokenExpires: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("Token", tokenSchema);
