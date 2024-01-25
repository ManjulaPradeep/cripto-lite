// const options = {
//     swaggerDefinition: require('./swaggerDefinition'),
//     apis: ['./src/v1/routes/*.js'],
//   };
  
//   module.exports = options;

const options = {
  swaggerDefinition: require('./swaggerDefinition'),
  apis: ['./src/v1/routes/*.js'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

module.exports = options;

  