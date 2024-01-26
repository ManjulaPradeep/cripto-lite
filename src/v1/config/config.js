// require('dotenv').config();

// module.exports = {
//   jwtSecret: process.env.JWT_SECRET,
// };
require('dotenv').config();

const commonConfig = {
  // Common configurations for all environments
};

const environmentConfig = {
  development: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
  },
  test: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
  },
  production: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SECRET,
  },
};

// Determine the environment
const environment = process.env.NODE_ENV || 'development';

// Combine common configurations with environment-specific configurations
const config = { ...commonConfig, ...environmentConfig[environment] };

console.log(`Starting environment : ${environment}`);

module.exports = config;
