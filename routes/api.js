const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../db');
const secrets = require('../SECRETS');


router.post('/authenticate', function(req, res) {
  // find the user
  db('users').where({email: req.body.email, passwordHashed: req.body.password})
  .select('id', 'email')
  .then(function(rows) {
    // create jwt
    if (rows !== undefined) {
      console.log('user found: ' + rows);
      // if user is found and password is right
      // create a token
      const claims = {
        sub: rows[0].id,
        iss: 'http://mysitedomain.com',
        permissions: 'add-recipes'
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

router.get('/users', function(req, res) {
  var results = [];

  db('users').select('email')
    .then(function(rows) {
      rows.forEach(function(row) {
        console.log(row);
        results.push(row);
      });
    })
    .then(function() {
      res.json(results);
    });
});

router.get('/users/:email', function(req, res) {
  res.send('hello ' + req.params.email);
});


module.exports = router;
