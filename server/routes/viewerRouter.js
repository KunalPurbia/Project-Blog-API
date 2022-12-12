const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const homeController = require('../controllers/homeController');
const commentController = require('../controllers/commentController');
const passport = require('passport');
require('../middlewares/jwtAuth')(passport);

router.get("/", passport.authenticate('jwt', { session: false }), homeController.allBlogs);

router.put("/becomeAuthor", passport.authenticate('jwt', {session: false}), userController.updateToAuthor);

router.get("/blog/:id", passport.authenticate('jwt', {session: false}), homeController.getFullBlog);

router.post("/blog/:id/comment", passport.authenticate('jwt', {session: false}), commentController.addComment);

router.delete("/blog/:id/comment", passport.authenticate('jwt', {session: false}), commentController.deleteComment);

module.exports = router;