const swaggerDefinition = {
  info: {
    title: 'Crypto Lite API',
    version: '1.0.0',
    description: `Documentation of REST API for Cryptocurrency Price Tracking.


    Plese register and log in with registerd credentials.Copy the Json Web Token.Then click on "Authorize button.
    Paste JWT as ' Bearer<space>your-JWT ' (Type Bearer and space then paste your JWT.) Ex: Bearer hhfeKBUYIdkfei 
    Click "Authorize" button.
    
    Data from CoinGecko: https://www.coingecko.com/en/api`,
  },
  basePath: '',

  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },

  
};

module.exports = swaggerDefinition;

  