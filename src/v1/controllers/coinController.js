const axios = require("axios");

class CoinController {
  async getCoinList(req, res) {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      const coinList = response.data;
      res.json(coinList);
    } catch (error) {
      console.error("Error fetching coin list:", error.message);
      res.status(500).json({ message: 'Internal Server Error', error: error.message || error });
    }
  }
}

module.exports = new CoinController();
