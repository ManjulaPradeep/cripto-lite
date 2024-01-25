const axios = require('axios');

async function getCryptoPrices(cryptos, currency, options) {
  try {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      ids: cryptos.join(','),// Joining user-provided crypto's
      vs_currency: currency,
      ...options, // Spreading user-provided options
    };

    const response = await axios.get(apiUrl, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error);
    throw new Error('Error fetching cryptocurrency prices');
  }
}

module.exports = {
  getCryptoPrices,
};
