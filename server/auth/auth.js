const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.SECRET_JWT;


function generateAccessToken(username) {
  const token = jwt.sign(username, secretKey, { expiresIn: '1d' });
  return token;
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(secretKey)
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, String(secretKey), (err, user) => {
    console.log(err);

    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;

    next()
  })
}

module.exports = { generateAccessToken, authenticateToken }