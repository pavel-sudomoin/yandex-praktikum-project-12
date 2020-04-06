const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'key');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }
  req.user = payload;
  next();
};
