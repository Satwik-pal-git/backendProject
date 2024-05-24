const express = require('express');
const authController = require("../controllers/authController");
const router = express.Router();

const { protectRoute } = require('../middleware/authMiddleware');


router
    .route("/")
    .get(authController.loginPage);

router
    .route("/profile")
    .get(protectRoute, authController.profilePage);

module.exports = router;