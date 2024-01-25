/**
 * @swagger
 * tags:
 *   name: UserFavorites
 *   description: Operations related to user favorite currencies
 *   security:
 *     - bearerAuth: []
 */

/**
 * @swagger
 * /api/v1/userFavorites/{user_id}:
 *   get:
 *     summary: Get user's favorite currencies
 *     tags: [UserFavorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *         example: 12345
 *     responses:
 *       200:
 *         description: User favorites retrieved successfully
 *       404:
 *         description: Not found. No favorite currencies for this user
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/userFavorites/create:
 *   post:
 *     summary: Create a new user favorite currency
 *     tags: [UserFavorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User favorite currency details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             crypto_id:
 *               type: string
 *               example: BTC
 *     responses:
 *       201:
 *         description: User's favorite currency created successfully
 *       400:
 *         description: Invalid request, missing fields, or incorrect data
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/userFavorites/update:
 *   put:
 *     summary: Update user's favorite currency
 *     tags: [UserFavorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User favorite currency details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 12345
 *             crypto_id:
 *               type: string
 *               example: ETH
 *     responses:
 *       201:
 *         description: User's favorite currency updated successfully
 *       400:
 *         description: Invalid request, missing fields, or incorrect data
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/userFavorites/delete:
 *   delete:
 *     summary: Delete user's favorite currency
 *     tags: [UserFavorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User favorite currency details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: 12345
 *     responses:
 *       200:
 *         description: User's favorite currency deleted successfully
 *       400:
 *         description: Invalid request, missing fields, or incorrect data
 *       500:
 *         description: Internal Server Error
 */