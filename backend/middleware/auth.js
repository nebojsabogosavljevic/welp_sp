// Example middleware for JWT authentication in Express

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(401); // Unauthorized
      }
      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
