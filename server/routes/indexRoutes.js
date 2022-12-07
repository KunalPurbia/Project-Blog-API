const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

//////////////////////////////////////////////////////////GET ROUTE FOR HOMEPAGE
router.get("/", indexController.getHomepage);

module.exports = router;