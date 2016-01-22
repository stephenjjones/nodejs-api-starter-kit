
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email');
      table.string('passwordHashed');
      table.timestamps();
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
