
const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');


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


/**
 * @swagger
 * /api/v1/coins/priceList:
 *   get:
 *     summary: Get a list of coin prices
 *     tags: [Coins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cryptos
 *         description: The cripto currencies to user nedd to get
 *         required: false
 *         schema:
 *           type: string
 *         example: bitcoin,ethereum,ripple
 *       - in: query
 *         name: vs_currency
 *         description: The currency to compare against
 *         required: false
 *         schema:
 *           type: string
 *         example: USD
 *       - in: query
 *         name: order
 *         description: The order of the list
 *         required: false
 *         schema:
 *           type: string
 *         example: market_cap_desc
 *       - in: query
 *         name: per_page
 *         description: The number of items per page
 *         required: false
 *         schema:
 *           type: string
 *         example: 100
 *       - in: query
 *         name: page
 *         description: The page number
 *         required: false
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: sparkline
 *         description: Include sparkline data
 *         required: false
 *         schema:
 *           type: boolean
 *         example: true
 *       - in: query
 *         name: locale
 *         description: The locale for the response
 *         required: false
 *         schema:
 *           type: string
 *         example: en
 *     responses:
 *       200:
 *         description: Successful response with a list of coin prices
 *       401:
 *         description: Unauthorized, token not provided
 *       500:
 *         description: Internal Server Error
 */
router.get('/coinList', coinController.getCoinList);
router.get('/priceList', coinController.getPriceList);


module.exports = router;
