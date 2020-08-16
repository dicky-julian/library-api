const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getTransactionC);
router.get('/getbyuser', transactionController.getTransactionByIdUserC);
router.post('/borrow', transactionController.borrowC);
router.put('/borrow', transactionController.returnC);
module.exports = router;