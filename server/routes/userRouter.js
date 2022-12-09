const router = require('./indexRoutes');

const userController = require('../controllers/userController')

router.post("/", userController.registerUser);

module.exports = router;