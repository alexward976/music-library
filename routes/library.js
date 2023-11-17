const router = require('express').Router();
const libraryController = require('../controllers/library');

router.get('/', libraryController.getAll)
router.get('/:id', libraryController.getById);

router.post('/add', libraryController.addSong);

router.put('/update/:id', libraryController.updateSong);

router.delete('/delete/:id', libraryController.deleteSong);

module.exports = router;