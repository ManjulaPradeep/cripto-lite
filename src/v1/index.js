require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const userRouter = require('./routes/userRouter');
const coinRouter = require('./routes/coinRouter');
const userFavoritesRouter = require('./routes/userFavoritesRouter');
const { verifyUserToken } = require('./middleware/authMiddleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../v1/swagger/swaggerOptions');


const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send('index js is running....');
});

app.use(bodyParser.json());
app.use(cors());

// // Swagger API documentation
// // http://localhost:3000/api-docs/
// Initialize Swagger-jsdoc
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use('/api/v1/users',userRouter);
app.use('/api/v1/coins',verifyUserToken,coinRouter);
app.use('/api/v1/userFavorites',verifyUserToken,userFavoritesRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Error: ${err.message}`);
  });
  

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


