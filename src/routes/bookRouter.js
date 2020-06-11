const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const bookController = require('../controllers/bookController');


router.get('/', bookController.getBookC);
router.get('/:id', bookController.getBookByIdC);
router.post('/', multer.upload, bookController.addBookC);
module.exports = router;