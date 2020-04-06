const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const isObjectIdValid = require('../validators/object-id-validator');

function searchResultHandler(res, user) {
  if (!user) {
    res.status(404).send({ message: 'Пользователя с таким id не существует' });
  } else {
    res.send(user);
  }
}

function updateUser(req, res, id, data) {
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .then((user) => searchResultHandler(res, user))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports.checkObjectId = (req, res, next) => {
  if (!isObjectIdValid(req.params.id)) {
    res.status(400).send({ message: 'Некорректный id пользователя' });
  } else {
    next();
  }
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => searchResultHandler(res, user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(500);
      if (err.name === 'MongoError' && err.code === 11000) {
        res.send({ message: 'user validation failed: email: Уже существует пользователь с данным email' });
      } else {
        res.send({ message: err.message });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, req.user._id, { name, about });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, req.user._id, { avatar });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' });
      res
        .status(200)
        .cookie('jwt', token, { maxAge: 604800, httpOnly: true, sameSite: true })
        .end();
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
