const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.getAuthorC);
router.get('/:id', authorController.getAuthorByIdC);
router.post('/', authorController.addAuthorC);
router.put('/:id', authorController.updateAuthorByIdC);
router.delete('/:id', authorController.deleteAuthorByIdC);

module.exports = router;