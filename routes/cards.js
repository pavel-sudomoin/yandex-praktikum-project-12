const router = require('express').Router();

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCardById);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', dislikeCard);

module.exports = router;
