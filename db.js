const db = require('knex')({
  client: 'pg',
  connection: {
    user: 'jones',
    host: 'localhost',
    port: '5432',
    database: 'recipedb',
    charset  : 'utf8'
  },
  debug: true
});

module.exports = db;
