const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => res.send('<h2> Hello World! </h2>'));
router.post('/login', authController.loginC);
router.post('/register', authController.registerC);

module.exports = router;