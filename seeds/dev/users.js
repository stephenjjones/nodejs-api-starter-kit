
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({id: 1, email: 'stephen.jacob.jones@gmail.com', passwordHashed: 'password'}),
    knex('users').insert({id: 2, email: 'heatherspeech@gmail.com', passwordHashed: 'password'})
  );
};
