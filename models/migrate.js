var bookshelf = require('./bookshelf');

var knex = bookshelf.knex;

var Schema = require('./schema');
var _ = require('lodash');
var Promise = require('bluebird');

function createTable(tableName) {
  return knex.schema.createTable(tableName, function (table) {
    
    var column;
    var columnKeys = _.keys(Schema[tableName]);

    _.each(columnKeys, function (key) {
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      }
      else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      }
      else {
        column = table[Schema[tableName][key].type](key);
      }
      
      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }

      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }

      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }

      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }

      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }

      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}

function createTables () {
  var tables = [];
  var tableNames = _.keys(Schema);
  console.log(tableNames);

  tables = _.map(tableNames, function (tableName) {
    return function () {
      return createTable(tableName);
    };
  });

  // https://github.com/petkaantonov/bluebird/issues/70
  // executes promises in sequencial order
  return Promise.reduce(tables, function(_, table) {return table();}, null);
}

createTables()
.then(function() {
  console.log('Tables created');
  process.exit(0);
})
.catch(function(err) {
  throw err;
});
