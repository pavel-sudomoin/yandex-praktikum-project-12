const mongoose = require('mongoose');

const Card = require('../models/card');

async function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    let card = await Card.create({ name, link, owner });
    card = await card.populate(['owner', 'likes']).execPopulate();
    res.status(201).send(card);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

function searchResultHandler(res, card) {
  if (!card) {
    res.status(404).send({ message: 'Карточки с таким id не существует' });
  } else {
    res.status(200).send(card);
  }
}

function searchErrorHandler(res, err) {
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: 'Некорректный id карточки' });
  } else {
    res.status(500).send({ message: err.message });
  }
}

module.exports.createCard = createCard;

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
      } else if (card.owner.toString() !== req.user._id) {
        res.status(403).send({ message: 'Недостаточно прав для удаления данной карточки' });
      } else {
        Card.findByIdAndRemove(req.params.id)
          .populate(['owner', 'likes'])
          .then((cardToDelete) => searchResultHandler(res, cardToDelete))
          .catch((err) => searchErrorHandler(res, err));
      }
    })
    .catch((err) => searchErrorHandler(res, err));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => searchErrorHandler(res, err));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => searchErrorHandler(res, err));
};
