const BadRequesError = require('../errors/bad-request-error');
const {
  ajv,
  cardValidate,
  userValidate,
  updateUserInfoValidate,
  updateUserAvatarValidate,
  loginValidate,
  idValidate,
} = require('./compiled-schemes.js');

function validator(next, data, validate) {
  const valid = validate(data);
  if (!valid) next(new BadRequesError(ajv.errorsText(validate.errors)));
  next();
}

module.exports.createCardValidator = (req, res, next) => {
  validator(next, req.body, cardValidate);
};

module.exports.createUserValidator = (req, res, next) => {
  validator(next, req.body, userValidate);
};

module.exports.updateUserInfoValidator = (req, res, next) => {
  validator(next, req.body, updateUserInfoValidate);
};

module.exports.updateUserAvatarValidator = (req, res, next) => {
  validator(next, req.body, updateUserAvatarValidate);
};

module.exports.loginValidator = (req, res, next) => {
  validator(next, req.body, loginValidate);
};

module.exports.idValidator = (req, res, next) => {
  validator(next, req.params.id, idValidate);
};
