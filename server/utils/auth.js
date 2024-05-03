const jwt = require('jsonwebtoken');
const secret = `${process.env.JWT_SECRET}`; 
const expiration = '24h';

module.exports = {
  // Function to sign the token
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function({ req }) {
    let token = req.headers.authorization;
    console.log("Received token:", token); 

    if (token) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      console.log("No token provided");
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
      console.log("Token is valid, user:", data);
    } catch (error) {
      console.warn('Invalid Token', error.message);
      if (error.name === "TokenExpiredError") {
        console.warn("Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        console.warn("JWT error:", error.message);
      }
    }

    return req;
  }
};
