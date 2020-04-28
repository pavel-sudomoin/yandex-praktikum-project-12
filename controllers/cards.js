const mongoose = require('mongoose');

const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequesError = require('../errors/bad-request-error');

function searchResultHandler(res, card) {
  if (!card) {
    throw new NotFoundError('Карточки с таким id не существует');
  } else {
    res.status(200).send(card);
  }
}

function searchErrorHandler(res, err, next) {
  if (err instanceof mongoose.Error.CastError) {
    next(new BadRequesError('Некорректный id карточки'));
  } else {
    next(err);
  }
}

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    let card = await Card.create({ name, link, owner });
    card = await card.populate(['owner', 'likes']).execPopulate();
    res.status(201).send(card);
  } catch (err) {
    next(new BadRequesError(err.message));
  }
};

module.exports.deleteCardById = async (req, res, next) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!card) {
      throw new NotFoundError('Карточки с таким id не существует');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Недостаточно прав для удаления данной карточки');
    }
    card = await card.remove();
    card = await card.populate(['owner', 'likes']).execPopulate();
    res.status(201).send(card);
  } catch (err) {
    searchErrorHandler(res, err, next);
  }
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => searchErrorHandler(res, err, next));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => searchErrorHandler(res, err, next));
};
