const router = require('express').Router();

const users = require('../data/users.json');

const doesUserExist = (req, res, next) => {
  const { id } = req.params;
  res.locals.user = users.find((item) => item._id === id);
  if (!res.locals.user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.send(res.locals.user);
};

const sendUsers = (req, res) => {
  res.send(users);
};

router.get('/users/:id', doesUserExist, sendUser);
router.get('/users', sendUsers);

module.exports = router;
