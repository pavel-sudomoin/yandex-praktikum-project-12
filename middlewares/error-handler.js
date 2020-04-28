const { isCelebrate } = require('celebrate');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { message = 'На сервере произошла ошибка' } = err;
  let { statusCode = 500 } = err;
  if (isCelebrate(err)) statusCode = 400;
  res.status(statusCode).send({ message });
};
