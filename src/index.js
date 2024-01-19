require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send('index js is running....');
});

app.use(bodyParser.json());
app.use(cors());


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


