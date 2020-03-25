const router = require('express').Router();

const {
  checkObjectId,
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', checkObjectId, deleteCardById);
router.put('/:id/likes', checkObjectId, likeCard);
router.delete('/:id/likes', checkObjectId, dislikeCard);

module.exports = router;
