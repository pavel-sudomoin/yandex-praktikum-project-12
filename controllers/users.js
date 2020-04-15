const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const BadRequesError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');

function addCookieToResponse(res, user) {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_DEV, { expiresIn: '7d' });
  res
    .status(200)
    .cookie('jwt', token, { maxAge: 604800000, httpOnly: true, sameSite: true });
}

function searchResultHandler(res, user) {
  if (!user) {
    throw new NotFoundError('Пользователя с таким id не существует');
  } else {
    res.status(200).send(user);
  }
}

function searchErrorHandler(res, err, next) {
  if (err instanceof mongoose.Error.CastError) {
    next(new BadRequesError('Некорректный id пользователя'));
  } else {
    next(err);
  }
}

function usersPasswordHandler(pass) {
  if (!pass) {
    throw new BadRequesError('user validation failed: password: Не указан пароль');
  }
  if (pass.length < 8) {
    throw new BadRequesError('user validation failed: password: Пароль должен быть не короче 8 символов');
  }
  return bcrypt.hash(pass, 10);
}

function updateUser(req, res, next, id, data) {
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    .then((user) => searchResultHandler(res, user))
    .catch(next);
}

module.exports.createUser = (req, res, next) => {
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
      res.status(201).send(user);
    })
    .catch((err) => {
      res.clearCookie('jwt');
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new BadRequesError('user validation failed: email: Уже существует пользователь с данным email'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      addCookieToResponse(res, user);
      res.status(200).send({ message: 'Вы успешно авторизованы' });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  updateUser(req, res, next, req.user._id, { name, about });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  updateUser(req, res, next, req.user._id, { avatar });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => searchResultHandler(res, user))
    .catch((err) => searchErrorHandler(res, err, next));
};
