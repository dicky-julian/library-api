const express = require('express');
const router = express.Router();
const authorRouter = require('./authorRouter');
const genreRouter = require('./genreRouter');

router.use('/author', authorRouter);
router.use('/genre', genreRouter);

module.exports = router;