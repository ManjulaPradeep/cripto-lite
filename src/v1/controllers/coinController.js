const axios = require("axios");
const cryptoService = require("../services/cryptoService");

class CoinController {
  async getCoinList(req, res) {
    const url1 = `https://api.coingecko.com/api/v3/coins/list`;
    try {
      const response = await axios.get(url1);
      const coinList = response.data;
      res.json(coinList);
    } catch (error) {
      console.error("Error fetching coin list:", error.message);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message || error,
      });
    }
  }

  async getPriceList(req, res) {
    const cryptos = req.body.cryptos || ["bitcoin", "ethereum", "ripple"];
    const currency = req.body.currency || "USD";
    const options = {
      order: req.body.order || "market_cap_desc",
      per_page: req.body.per_page || 100,
      page: req.body.page || 1,
      sparkline: req.body.sparkline || false,
      locale: req.body.locale || "en",
    };

    try {
      const prices = await cryptoService.getCryptoPrices(
        cryptos,
        currency,
        options
      );
      res.status(200).json(prices);
    } catch (error) {
      console.error("Error fetching coin list:", error.message);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message || error,
      });
    }
  }
}

module.exports = new CoinController();
