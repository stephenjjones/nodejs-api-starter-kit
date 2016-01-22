var bookshelf = require('./bookshelf');

var User = bookshelf.Model.extend({
  tableName: 'users'
});

var Users = bookshelf.Collection.extend({
  model: User
});

module.exports = Users;
