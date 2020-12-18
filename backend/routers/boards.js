const express = require('express')
const router = express.Router();
const boardController = require('../controllers/board');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.get('/', auth, boardController.getBoard);
router.post('/', auth, boardController.createBoard);
router.post('/:boardId', auth, boardController.createCategory);
router.post('/:boardId/:categoryId', auth, boardController.createTask);

module.exports = router;