const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../models/bookshelf').knex;
const secrets = require('../SECRETS');
const Users = require('../models/user');
const Recipes = require('../models/recipe').Recipes;
const Recipe = require('../models/recipe').Recipe;
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
          console.log('password doesnt match ');
          res.json({ success: false, message: 'Authentication failed' });
        } else {
          console.log('user found: ' + rows);
          // if user is found and password is right
          // create a token
          const acls = [
            'users:read',
            'users:create',
            'recipes:create',
            'recipes:edit',
            'recipes:delete',
            'recipes:read'
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
          res.cookie('token', token, { domain: '', httpOnly: true});
          res.set('Access-Control-Allow-Origin', 'localhost:3008');
          res.set('Access-Control-Allow-Credentials', 'true');
          res.json({
            success: true,
            message: 'Enjoy your token',
            token: token
          });
        }

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
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

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
    res.json({error: false, users: collection.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

// RECIPE ROUTES

router.get('/recipes/:id', check_scopes(['recipes:read']), function(req, res) {
  Recipe.forge({id: req.params.id})
  .fetch()
  .then(function (item) {
    if (!item) {
      res.status(404).json({error: true, data: {}});
    } else {
      res.json({error: false, data: item.toJSON()});
    }
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.put('/recipes/:id', check_scopes(['recipes:edit']), function(req, res) {
  Recipe.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (recipe) {
    recipe.save({
      name: req.body.name || recipe.get('name'),
      overview: req.body.overview || recipe.get('overview'),
      category: req.body.category || recipe.get('category')
    })
    .then(function() {
      res.json({error: false, data: {message: 'Recipe details updated'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.delete('/recipes/:id', check_scopes(['recipes:delete']), function(req, res) {
  Recipe.forge({id: req.params.id})
  .fetch({require: true})
  .then(function (recipe) {
    recipe.destroy()
    .then(function() {
      res.json({error: false, data: {message: 'Recipe successfully deleted'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.get('/recipes', check_scopes(['recipes:read']), function(req, res) {
  var results = [];

  Recipes.forge()
  .fetch()
  .then(function (collection) {
    res.json({error: false, results: collection.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.post('/recipes', check_scopes(['recipes:create']), function(req, res) {
  var results = [];

  Recipe.forge({
    name: req.body.name,
    overview: req.body.overview,
    category: req.body.category
  })
  .save()
  .then(function (recipe) {
    res.json({error: false, data: recipe.toJSON()});
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;
