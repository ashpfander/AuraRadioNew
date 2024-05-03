const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; 
const expiration = '2h';

module.exports = {
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function(req, res, next) {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log('No token provided.');
      return next();
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log('Token verified:', req.user);
    } catch (err) {
      console.warn('Invalid Token:', err.message);
    }

    next();
  }
};

