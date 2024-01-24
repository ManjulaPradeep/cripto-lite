const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

router.get('/coinList', coinController.getCoinList);

module.exports = router;