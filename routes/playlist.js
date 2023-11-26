const { isAuthenticated } = require('../middleware/authenticate');
const router = require('express').Router();
const playlistController = require('../controllers/playlist');

router.get('/', isAuthenticated,  playlistController.getAll);
router.get('/:id', isAuthenticated, playlistController.getById);

router.post('/add', isAuthenticated, playlistController.addSong);

router.put('/update/:id', isAuthenticated, playlistController.updateSong);

router.delete('/delete/:id', isAuthenticated, playlistController.deleteSong);

module.exports = router;