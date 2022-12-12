const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const homeController = require('../controllers/homeController');
const passport = require('passport');
require('../middlewares/jwtAuth')(passport);

router.get("/", passport.authenticate('jwt', { session: false }), homeController.allBlogs);

router.post("/addBlog", passport.authenticate('jwt', { session: false }), authorController.createBlog);

router.get("/blog/:id", passport.authenticate('jwt', { session: false }), homeController.getFullBlog);

router.put("/blog/:id", passport.authenticate('jwt', { session: false }), authorController.editBlog);

router.delete("/blog/:id", passport.authenticate('jwt', { session: false}), authorController.deleteBlog);

router.put("/blog/:id/publish", passport.authenticate('jwt', {session: false}), authorController.publishBlog);

router.put("/blog/:id/unpublish", passport.authenticate('jwt', {session: false}), authorController.unpublishBlog);

router.delete("/blog/:id/comment/:commentId", passport.authenticate('jwt', {session: false}), authorController.deleteComment);

module.exports = router;