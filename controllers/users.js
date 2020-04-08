const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');

function addCookieToResponse(res, user) {
  const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' });
  res
    .status(200)
    .cookie('jwt', token, { maxAge: 604800000, httpOnly: true, sameSite: true });
}

function searchResultHandler(res, user) {
  if (!user) {
    res.status(404).send({ message: 'Пользователя с таким id не существует' });
  } else {
    res.status(200).send(user);
  }
}

function searchErrorHandler(res, err) {
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: 'Некорректный id пользователя' });
  } else {
    res.status(500).send({ message: err.message });
  }
}

function usersPasswordHandler(pass) {
  if (!pass) {
    return Promise.reject(new Error('user validation failed: password: Не указан пароль'));
  }
  if (pass.length < 8) {
    return Promise.reject(new Error('user validation failed: password: Пароль должен быть не короче 8 символов'));
  }
  return bcrypt.hash(pass, 10);
}

function updateUser(req, res, id, data) {
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .then((user) => searchResultHandler(res, user))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports.createUser = (req, res) => {
  usersPasswordHandler(req.body.password)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      addCookieToResponse(res, user);
      res.send(user);
    })
    .catch((err) => {
      res.status(500);
      res.clearCookie('jwt');
      if (err.name === 'MongoError' && err.code === 11000) {
        res.send({ message: 'user validation failed: email: Уже существует пользователь с данным email' });
      } else {
        res.send({ message: err.message });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      addCookieToResponse(res, user);
      res.send({ message: 'Вы успешно зарегистрированы' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
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

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => searchResultHandler(res, user))
    .catch((err) => searchErrorHandler(res, err));
};
