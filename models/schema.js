var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    passwordHashed: {type: 'string', maxlength: 150, nullable: false}
  }
};

module.exports = Schema;
