let jwt = require('jsonwebtoken');
let { PRIVATE_KEY } = require('../constans');

function tokenRequired(req, res, next) {
  const authHeader =  req.headers.authorization;

  if(authHeader) {
    try {
      const token = authHeader.split(' ')[1];
      let decoded = jwt.verify(token, PRIVATE_KEY);
      next();
    } catch(err) {
      return res.status(401).json({ 'message': 'user not logged in' });
    }
  } else {
    return res.status(401).json({ 'message': 'user not logged in' });
  }
}

function isAdmin(req, res, next) {
  const authHeader =  req.headers.authorization;

  try {
    const token = authHeader.split(' ')[1];
    let decoded = jwt.verify(token, PRIVATE_KEY);
    if (decoded.data.role === 'admin') {
      next();
    } else {
      res.status(403).json({ 'message': 'method not allowed' });
    }
  } catch(err) {
    return res.status(403).json({ 'message': 'token expired' });
  }
}

module.exports = {
  tokenRequired,
  isAdmin
};