const router = require('express').Router();

const { getUsers, getUserById, createUser } = require('../controllers/users.js');

router.get('/:id', getUserById);
router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
