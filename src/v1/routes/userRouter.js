const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const { verifyUserToken } = require('../middleware/authMiddleware');

// only for test the JWT token is successfull verifies.
const users = [{users: 'This is a test only !', messge: 'Your JWT is successfully verified.'}];
router.get('/', verifyUserToken, (req, res) => {
  res.json(users);
});

router.post('/register', registerController);
router.post('/login', loginController);


module.exports = router;
