// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { message = 'На сервере произошла ошибка', statusCode = 500 } = err;
  res.status(statusCode).send({ message });
};
