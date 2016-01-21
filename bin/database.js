// Script to create users table
var db = require('../db.js');

var usersTable = function(table) {
  table.increments('id').primary();
  table.string('email', 100);
  table.string('passwordHashed');
  table.boolean('emailVerified');
  table.timestamps();
};

db.schema.createTableIfNotExists('users', usersTable)
.then(function() {
  console.log('created users table');
})
.catch(function(error) {
  console.error(error);
})
.finally(function() {
  db.destroy();
});
