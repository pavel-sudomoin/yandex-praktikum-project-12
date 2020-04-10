const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
