const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../models/bookshelf').knex;
const secrets = require('../SECRETS');
const Users = require('../models/user');
var check_scopes = require('../middleware/checkscopes');

const BCRYPT_WORK_FACTOR = 12;

router.post('/authenticate', function(req, res) {

  // find the user
  db('users').where({email: req.body.email})
  .select('id', 'email', 'passwordHashed')
  .then(function(rows) {

    if (rows !== undefined) {

      bcrypt.compare(req.body.password, rows[0].passwordHashed, function(err, response) {
        if (response === false) {
          res.json({ success: false, message: 'Authentication failed' });
          console.log('password doesnt match ');
        }

        console.log('user found: ' + rows);
        // if user is found and password is right
        // create a token
        const acls = [
          'users:read',
          'users:create'
        ];
        const claims = {
          sub: rows[0].id,
          iss: 'http://mysitedomain.com',
          scopes: acls
          
        };
        var token = jwt.sign(claims, secrets.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        console.log(token);
        res.json({
          success: true,
          message: 'Enjoy your token',
          token: token
        });

      });
    } else {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
      console.log('no user found: ' + rows);
    }
    
  })
  .catch(function(err) {
    console.log(err);
  });
});


// route middleware to verify a token
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks expiration
    jwt.verify(token, secrets.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

router.get('/users', check_scopes(['users:read']), function(req, res) {
  var results = [];

  Users.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, data: collection.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.get('/users/:email', function(req, res) {
  res.send('hello ' + req.params.email);
});


module.exports = router;
