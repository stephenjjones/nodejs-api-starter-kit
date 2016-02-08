var Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    email: {type: 'string', maxlength: 254, nullable: false, unique: true},
    passwordHashed: {type: 'string', maxlength: 150, nullable: false}
  },
  recipes: {
    id: {type: 'increments', nullable: false, primary: true},
    name: {type: 'string', maxlength: 254, nullable: true},
    overview: {type: 'string', maxlength: 254, nullable: true},
    category: {type: 'string', maxlength: 254, nullable: true}
  },
  steps: {
    id: {type: 'increments', nullable: false, primary: true},
    order: {type: 'float', nullable: false},
    text: {type: 'string', maxlength: 254, nullable: false},
    recipe_id: {type: 'integer', nullable: false}
  },
  ingredients: {
    id: {type: 'increments', nullable: false, primary: true},
    order: {type: 'float', nullable: false},
    name: {type: 'string', maxlength: 254, nullable: false},
    amount: {type: 'string', maxlength: 150, nullable: true},
    recipe_id: {type: 'integer', nullable: false}
  }
};

module.exports = Schema;
