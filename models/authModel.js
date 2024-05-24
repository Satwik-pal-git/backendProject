const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    photo: String,
    provider: { type: String, default: "Google" },
    photo: {
        data: Buffer,
        contentType: String
    },
    bio: { type: String },
    phone: { type: String },
    isAdmin: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
});

module.exports = mongoose.model("user", userSchema);