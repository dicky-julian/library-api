const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const bookRouter = require('./bookRouter');
const authorRouter = require('./authorRouter');
const genreRouter = require('./genreRouter');
const userRouter = require('./userRouter');

router.use('/', authRouter);
router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/genre', genreRouter);
router.use('/user', userRouter);

module.exports = router;