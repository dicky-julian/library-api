const express = require('express');
const router = express.Router();
const bookRouter = require('./bookRouter');
const authorRouter = require('./authorRouter');
const genreRouter = require('./genreRouter');

router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);

module.exports = router;