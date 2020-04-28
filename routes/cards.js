const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards.js');

const {
  createCardValidator,
  idValidator,
} = require('../validators/celebrate-validators');

router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', idValidator, deleteCardById);
router.put('/:id/likes', idValidator, likeCard);
router.delete('/:id/likes', idValidator, dislikeCard);

module.exports = router;
