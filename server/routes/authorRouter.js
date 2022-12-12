const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const passport = require('passport');
require('../middlewares/jwtAuth')(passport)

router.post("/create", passport.authenticate('jwt', { session: false }), authorController.createBlog);

module.exports = router;