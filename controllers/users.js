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
    res.status(404).send({ message: 'Некорректный id пользователя' });
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  updateUser(req, res, req.user._id, { name, about });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUser(req, res, req.user._id, { avatar });
};
