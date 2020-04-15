module.exports = (err, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = err;
  res.status(statusCode).send({ message });
};
