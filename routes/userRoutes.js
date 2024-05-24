const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getPublicProfiles, getAllProfiles } = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/authMiddleware.js');
const upload = require('../middleware/uploadMiddleware');

router.post('/update/profile', upload.single('photo'), updateProfile);
router.get('/public', auth, getPublicProfiles);
router.get('/all', [auth, adminAuth], getAllProfiles);

module.exports = router;
