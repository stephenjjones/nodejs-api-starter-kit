var bookshelf = require('./bookshelf');

require('./recipe');
var Ingredient = bookshelf.Model.extend({
  tableName: 'ingredients',
  recipe: function() {
    return this.belongsTo('Recipe');
  }
});

var Ingredients = bookshelf.Collection.extend({
  model: Ingredient
});


module.exports = {
  Ingredient: bookshelf.model('Ingredient', Ingredient),
  Ingredients: bookshelf.collection('Ingredients', Ingredients)
};
