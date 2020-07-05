const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginC);
router.post('/register', authController.registerC);

module.exports = router;