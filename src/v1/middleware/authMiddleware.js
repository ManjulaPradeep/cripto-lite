const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const verifyUserToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send('Invalid or expired token !\n' + err);
  }
};

module.exports = { verifyUserToken };