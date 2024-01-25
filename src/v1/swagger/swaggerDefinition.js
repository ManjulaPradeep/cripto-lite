const swaggerDefinition = {
  info: {
    title: 'Crypto Lite API',
    version: '1.0.0',
    description: 'Documentation of REST API for Cryptocurrency Price Tracking',
  },
  // basePath: '/api/v1',
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

  