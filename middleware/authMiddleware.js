const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.auth = async (req, res, next) => {
    const token = req.session.token;
    req.user = req.session.authUser;
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.user);
        if (!user.isAdmin) return res.status(403).json({ msg: 'Access denied' });
        next();
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.protectRoute = (req, res, next) => {
    const token = req.session.token;

    if (token) {
        next();
    } else {
        res.redirect('/');
    }
};
