const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware.verifyAdmin, authorController.getAuthorC);
router.get('/:id', authorController.getAuthorByIdC);
router.post('/', authMiddleware.verifyAdmin, authorController.addAuthorC);
router.put('/:id', authMiddleware.verifyAdmin, authorController.updateAuthorByIdC);
router.delete('/:id', authMiddleware.verifyAdmin, authorController.deleteAuthorByIdC);

module.exports = router;