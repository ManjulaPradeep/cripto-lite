require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const userRouter = require("./routes/userRouter");
const coinRouter = require("./routes/coinRouter");
const userFavoritesRouter = require("./routes/userFavoritesRouter");
const { verifyUserToken } = require("./middleware/authMiddleware");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("../v1/swagger/swaggerOptions");
const config = require("../v1/config/config");
const http = require("http");
const path = require("path");

const WebSocket = require("ws");
const fs = require("fs");


const app = express();
const port = config.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname,) });
});

app.use(bodyParser.json());
app.use(cors());

// WebSocket handling
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/cryptoprices" });
perMessageDeflate: false;
const clients = new Set();

function broadcastPrices(prices) {
  const serializedPrices = JSON.stringify(prices);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(serializedPrices); 
    }
  });
}

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
  ws.on("close", () => {
    clients.delete(ws);
  });
});


// Swagger API documentation http://localhost:3000/api-docs/
// Initialize Swagger-jsdoc
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1/users", userRouter);
// app.use("/api/v1/coins", verifyUserToken, coinRouter);
app.use("/api/v1/coins", coinRouter);
app.use("/api/v1/userFavorites", verifyUserToken, userFavoritesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Error: ${err.message}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Fetch and broadcast prices every 5 minutes
async function fetchAndBroadcastPrices() {
  try {
    // Fetch prices from the new getPriceList route
    const response = await axios.get('http://localhost:3000/api/v1/coins/priceList');
    const prices = response.data;

    // Broadcast prices to WebSocket clients
    broadcastPrices(prices);
  } catch (error) {
    console.error('Error fetching and broadcasting prices:', error.message);
  }
}

setInterval(fetchAndBroadcastPrices, 300000);
