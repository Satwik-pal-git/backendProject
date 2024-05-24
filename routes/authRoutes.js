const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const passport = require('passport');
const { register, login, logout, loginPage } = require('../controllers/authController');
const { auth } = require('../middleware/authMiddleware');

// Validation middleware
const registerValidation = [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 8 })
];

const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
];

// Local authentication
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', auth, logout);



// Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    req.session.authUser = req.user;
    req.session.token = req.sessionID;
    res.redirect('/profile');
});


module.exports = router;
