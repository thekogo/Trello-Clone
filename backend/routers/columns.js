const express = require('express')
const router = express.Router();
const columnController = require('../controllers/column');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.patch('/updateCol', auth, columnController.updateOrderCol);
router.patch('/title', auth, columnController.updateTitle);
router.put('/', auth, columnController.deleteCol);

module.exports = router;