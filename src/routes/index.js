const express = require('express');
const router = express.Router();
const authorRouter = require('./authorRouter');

router.use('/author', authorRouter);

module.exports = router;