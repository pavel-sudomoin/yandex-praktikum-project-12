const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const { login, createUser } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
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
  useUnifiedTopology: true,
});

app.use(helmet());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  next();
});

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) res.status(404).send({ message: 'Invalid Request data' });
  else next();
});

app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/cards', auth, cards);
app.use('/users', auth, users);
app.use('*', wrongRequests);
