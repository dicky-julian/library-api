const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

router.get('/', genreController.getGenreC);
router.get('/:id', genreController.getGenreByIdC);
router.post('/', genreController.addGenreC);
router.put('/:id', genreController.updateGenreByIdC);
router.delete('/:id', genreController.deleteGenreByIdC);

module.exports = router;