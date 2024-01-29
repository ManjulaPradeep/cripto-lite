const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

const pool = mysql.createPool(dbConfig);

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`Connected to database: ${process.env.DB_NAME}`);
    connection.release();

  } catch (error) {
    console.error(`Error connecting to database: ${process.env.DB_NAME}`);
    console.error(error.message);
  }
})();



module.exports = pool;