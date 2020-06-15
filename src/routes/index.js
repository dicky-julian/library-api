const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const authRouter = require('./authRouter');
const bookRouter = require('./bookRouter');
const authorRouter = require('./authorRouter');
const genreRouter = require('./genreRouter');
const userRouter = require('./userRouter');

router.use('/', authRouter);
router.use('/book', authMiddleware.verifyJwt, bookRouter);
router.use('/author', authMiddleware.verifyJwt, authorRouter);
router.use('/genre', authMiddleware.verifyJwt, genreRouter);
router.use('/user', authMiddleware.verifyJwt, userRouter);

module.exports = router;