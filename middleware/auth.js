const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token'); //this will give me the token when the user logged in the account

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token,authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.present_user = decoded.user;

    next(); //it will tell the route to move on the next middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
    console.log(err.message);
  }
};
