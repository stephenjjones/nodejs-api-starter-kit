const bcrypt = require('bcrypt');

const BCRYPT_WORK_FACTOR = 12;

const hashPassword = function(password, work_factor) {
    const salt = bcrypt.genSaltSync(BCRYPT_WORK_FACTOR);
    const passwordHashed = bcrypt.hashSync(password, salt);
    return passwordHashed;
};

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 


    // Inserts seed entries
    knex('users').insert({id: 1, email: 'stephen.jacob.jones@gmail.com', passwordHashed: hashPassword('password')}),
    //knex('users').insert({id: 2, email: 'sj@gmail.com', passwordHashed: hashPassword('password')})
  );
};
