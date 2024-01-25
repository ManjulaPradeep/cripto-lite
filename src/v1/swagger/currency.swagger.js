/**
 * @swagger
 * tags:
 *   name: Coins
 *   description: Coin-related operations
 */

/**
 * @swagger
 * /api/v1/coins/coinList:
 *   get:
 *     summary: Get a list of coins
 *     tags: [Coins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of coins
 *       401:
 *         description: Unauthorized, token not provided
 *       500:
 *         description: Internal Server Error
 */
// router.get('/coinList', coinController.getCoinList);

/**
 * @swagger
 * /api/v1/coins/priceList:
 *   get:
 *     summary: Get a list of coin prices
 *     tags: [Coins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with a list of coin prices
 *       401:
 *         description: Unauthorized, token not provided
 *       500:
 *         description: Internal Server Error
 */