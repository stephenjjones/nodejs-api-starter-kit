var bookshelf = require('./bookshelf');

require('./step');
require('./ingredient');
var Recipe = bookshelf.Model.extend({
  tableName: 'recipes',
  steps: function() {
    return this.hasMany('Step');
  },
  ingredients: function() {
    return this.hasMany('Ingredient');
  }
});

var Recipes = bookshelf.Collection.extend({
  model: Recipe
});

module.exports = {
  Recipe: bookshelf.model('Recipe', Recipe),
  Recipes: bookshelf.collection('Recipes', Recipes)
};
