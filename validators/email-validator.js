const validator = require('validator');

const BadRequesError = require('../errors/bad-request-error');

module.exports.validator(next, data, validate) {
  const valid = validate(data);
  if (!valid) next(new BadRequesError(ajv.errorsText(validate.errors)));
  next();
}
