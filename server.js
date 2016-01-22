const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const bookshelf = require('./models/bookshelf');
const config = require('./config');
const secrets = require('./SECRETS');
const User = require('./models/user');
const apiRouter = require('./routes/api');

const app = express();
const port = config.port;

app.set('superSecret', secrets.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

const staticDir = './static';

app.use('static', express.static(staticDir));

app.use('/api/', apiRouter);

app.get('/setup', function(req, res) {
  // create a sample user
  var db = bookshelf.knex
  db('users')
    .insert({email: 'stephen.jacob.jones@gmail.com', passwordHashed: 'password'}).returning('id')
    .then(function(id) {
      console.log('added sample user with id: ' + id);
      res.json({ id: id[0] });
    })
    .catch(function(err) {
      console.log(err);
      res.send('No soup for you');
    });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(config.port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info(`Express is listening to http://localhost:${config.port}`);
  }
});
