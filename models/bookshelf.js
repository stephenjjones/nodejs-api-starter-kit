const dbConfig = {
  client: 'pg',
  connection: {
    user: 'jones',
    host: 'localhost',
    port: '5432',
    database: 'recipedb',
    charset  : 'utf8'
  },
  debug: true
};

const knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);
