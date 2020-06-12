const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.loginC);
router.get('/register', authController.registerC);

module.exports = router;