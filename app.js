const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const cardsRouter = require('./routes/cards-router.js');
const users = require('./routes/users.js');
const wrongRequestRouter = require('./routes/wrong-request-router.js');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/cards', cardsRouter);
app.use('/users', users);
app.use('*', wrongRequestRouter);
