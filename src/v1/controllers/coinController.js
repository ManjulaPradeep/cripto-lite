const axios = require("axios");

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
    const vs_currency = req.params.vs_currency || "usd";
    const order = req.params.order || "market_cap_desc";
    const per_page = req.params.per_page || "100";
    const page = req.params.page || 1;
    const sparkline = req.params.sparkline || false;
    const locale = req.params.locale || "en";

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=${sparkline}&locale=${locale}`;

    try {
      const response = await axios.get(url);
      const priceList = response.data;
      res.status(200).json(priceList);

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
