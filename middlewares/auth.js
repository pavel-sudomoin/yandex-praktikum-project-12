const jwt = require('jsonwebtoken');

const User = require('../models/user');

const UnauthorizedError = require('../errors/unauthorized-error');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    if (!token) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    payload = jwt.verify(token, process.env.JWT_DEV);
    const user = await User.findById(payload._id);
    if (!user) {
      throw new UnauthorizedError('Необходима авторизация');
    }
  } catch (err) {
    res.clearCookie('jwt');
    next(err);
  }
  req.user = payload;
  next();
};
