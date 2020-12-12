const express = require('express')
const router = express.Router();
const boardController = require('../controllers/board');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.get('/', auth, boardController.getBoard);
router.post('/', auth, boardController.createBoard);

module.exports = router;