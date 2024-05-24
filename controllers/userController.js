const bcrypt = require('bcryptjs');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

exports.getPublicProfiles = async (req, res) => {
    try {
        const users = await User.find({ isPublic: true }).select('-password');
        res.render("social", { users })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllProfiles = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.render("admin", { users })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, bio, isPublic } = req.body;
        const userId = req.session.authUser._id;
        const user = await User.findById(userId);

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (bio) user.bio = bio;
        if (isPublic !== undefined) user.isPublic = isPublic;

        if (req.file) {
            const filePath = req.file.path.replace(/\\/g, '/');
            user.photo = filePath;
        }

        await user.save();
        req.session.authUser = user;
        res.status(200).redirect("/profile");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

