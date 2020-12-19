const express = require('express')
const router = express.Router();
const taskController = require('../controllers/task');
const passport = require('passport');

const auth = passport.authenticate("jwt", { session: false });

router.patch('/same', auth, taskController.updateSame);
router.put('/', auth, taskController.deleteTask);


module.exports = router;