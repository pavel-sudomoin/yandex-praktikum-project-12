const express = require('express');
const path = require('path');

const cardsRouter = require('./routes/cards-router.js');
const usersRouter = require('./routes/users-router.js');
const wrongRequestRouter = require('./routes/wrong-request-router.js');

const { PORT = 3000 } = process.env;

const app = express();

app.listen(PORT);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use('*', wrongRequestRouter);
