const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users.js');

const {
  updateUserInfoValidator,
  updateUserAvatarValidator,
  idValidator,
} = require('../validators/validators');

router.get('/', getUsers);
router.get('/:id', idValidator, getUserById);
router.patch('/me', updateUserInfoValidator, updateUserInfo);
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar);

module.exports = router;
