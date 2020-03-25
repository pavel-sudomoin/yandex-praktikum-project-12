const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cards = require('./routes/cards.js');
const users = require('./routes/users.js');
const wrongRequests = require('./routes/wrong-requests.js');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) res.status(404).send({ message: 'Invalid Request data' });
  else next();
});

app.use((req, res, next) => {
  req.user = { _id: '5e78758f15969c0cf4636ccb' };
  next();
});

app.use('/cards', cards);
app.use('/users', users);
app.use('*', wrongRequests);
