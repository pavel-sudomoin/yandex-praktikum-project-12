const { celebrate, Joi } = require('celebrate');

const url = require('./joi-custom-url-validator.js');

module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(url, 'url validation'),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(url, 'url validation'),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.updateUserInfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(url, 'url validation'),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});
