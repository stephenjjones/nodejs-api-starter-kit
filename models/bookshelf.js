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
const bookshelf = require('bookshelf')(knex);

// http://billpatrianakos.me/blog/2015/11/30/how-to-structure-bookshelf-dot-js-models/
bookshelf.plugin('registry');

module.exports = bookshelf;
