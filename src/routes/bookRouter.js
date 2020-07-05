const express = require('express');
const router = express.Router();
const multer = require('../helpers/multer');
const bookController = require('../controllers/bookController');
const transactionController = require('../controllers/transactionController');

router.get('/', bookController.getBookC);
router.get('/:id', bookController.getBookByIdC);
router.post('/', multer.upload, bookController.addBookC);
router.post('/borrow', transactionController.borrowC)
router.put('/:id', multer.upload, bookController.updateBookByIdC);
router.delete('/:id', bookController.deleteBookByIdC);
module.exports = router;