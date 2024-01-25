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


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication operations
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: userpassword
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request, missing fields, or incorrect data
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Log in with existing credentials
 *     tags: [Authentication]
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: userpassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid request, missing fields, or incorrect data
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;



// router.post('/register', registerController);
// router.post('/login', loginController);


// module.exports = router;
