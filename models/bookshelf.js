const dbConfig = {
  client: 'pg',
  connection: {
    user: 'stephenjones',
    host: 'localhost',
    port: '5432',
    database: 'nodestarter',
    charset  : 'utf8'
  },
  debug: true
};

const knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);
