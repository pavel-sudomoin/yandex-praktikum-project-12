const router = require('express').Router();

const { getCards, deleteCardById, createCard } = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCardById);

module.exports = router;
