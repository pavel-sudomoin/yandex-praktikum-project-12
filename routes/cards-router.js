const router = require('express').Router();

const cards = require('../data/cards.json');

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
