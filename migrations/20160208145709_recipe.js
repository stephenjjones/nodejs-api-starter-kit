
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('recipes', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('overview');
      table.string('category');
      table.timestamps();
    }),

    knex.schema.createTable('steps', function(table) {
      table.increments('id').primary();
      table.string('text');
      table.float('order');
      table.integer('recipe_id')
        .references('id')
        .inTable('recipes');
      table.timestamps();
    }),

    knex.schema.createTable('ingredients', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('amount');
      table.float('order');
      table.integer('recipe_id')
        .references('id')
        .inTable('recipes');
      table.timestamps();
    }),

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('recipes'),
    knex.schema.dropTable('steps'),
    knex.schema.dropTable('ingredients')
  ])
};
