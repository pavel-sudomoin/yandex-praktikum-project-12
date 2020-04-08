const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const urlValidator = require('../validators/url-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Имя пользователя должно быть длиннее 2 символов'],
    maxlength: [30, 'Имя пользователя должно быть короче 30 символов'],
    required: [true, 'Не указано имя пользователя'],
  },
  about: {
    type: String,
    minlength: [2, 'Информация о пользователе должна быть длиннее 2 символов'],
    maxlength: [30, 'Информация о пользователе должна быть короче 30 символов'],
    required: [true, 'Не заполнено поле с информацией о пользователе'],
  },
  avatar: {
    type: String,
    validate: [urlValidator, 'Некорректная ссылка на аватар'],
    required: [true, 'Не указана ссылка на аватар'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Некорректный email'],
    unique: true,
    required: [true, 'Не указан email'],
  },
  password: {
    type: String,
    minlength: [8, 'Пароль должен быть не короче 8 символов'],
    select: false,
    required: [true, 'Не указан пароль'],
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

function showOnlyWhiteListFields(doc, ret) {
  const retJson = {
    name: ret.name,
    about: ret.about,
    avatar: ret.avatar,
    email: ret.email,
  };
  return retJson;
}

userSchema.set('toJSON', { transform: showOnlyWhiteListFields });

module.exports = mongoose.model('user', userSchema);
