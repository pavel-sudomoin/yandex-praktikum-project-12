const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_DEV);
    const user = await User.findById(payload._id);
    if (!user) {
      res.clearCookie('jwt');
      throw new Error();
    }
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }
  req.user = payload;
  next();
};
