const mongoose = require('mongoose');

const urlValidatorForMongoose = require('../validators/url-validator-for-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: urlValidatorForMongoose,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
