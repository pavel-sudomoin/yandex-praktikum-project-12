const Card = require('../models/card');

const isObjectIdValid = require('../validators/object-id-validator');

async function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    let card = await Card.create({ name, link, owner });
    card = await card.populate(['owner', 'likes']).execPopulate();
    res.send(card);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

function searchResultHandler(res, card) {
  if (!card) {
    res.status(404).send({ message: 'Карточки с таким id не существует' });
  } else {
    res.send(card);
  }
}

module.exports.checkObjectId = (req, res, next) => {
  if (!isObjectIdValid(req.params.id)) {
    res.status(404).send({ message: 'Некорректный id карточки' });
  } else {
    next();
  }
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = createCard;

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => searchResultHandler(res, card))
    .catch((err) => res.status(500).send({ message: err.message }));
};
