const mongoose = require('mongoose');

const urlValidator = require('../validators/url-validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Название карточки должно быть длиннее 2 символов'],
    maxlength: [30, 'Название карточки должно быть короче 30 символов'],
    required: [true, 'Не указано название карточки'],
  },
  link: {
    type: String,
    validate: [urlValidator, 'Некорректная ссылка на картинку'],
    required: [true, 'Не указана ссылка на картинку'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
