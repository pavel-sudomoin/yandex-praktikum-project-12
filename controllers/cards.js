const Card = require('../models/card');

const isObjectIdValid = require('../validators/object-id-validator');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  if (!isObjectIdValid(req.params.id)) {
    res.status(404).send({ message: 'Некорректный id карточки' });
  }
  Card.findByIdAndRemove(req.params.id)
    .populate('owner')
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточки с таким id не существует' });
      }
      res.send(card);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

async function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    let card = await Card.create({ name, link, owner });
    card = await card.populate('owner').execPopulate();
    res.send(card);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports.createCard = createCard;
