const Recipe = require('../models/recipe').Recipe;
const Step = require('../models/step').Step;
const Ingredient = require('../models/ingredient').Ingredient;
const data = require('../data/recipe.js');

data.recipes.forEach(function(recipe) {
  Recipe.forge({
    name: recipe.name,
    overview: recipe.overview,
    category: recipe.category
  })
  .save()
  .then(function (recipeEntry) {
    // add ingredients
    recipe.ingredients.forEach(function(ingredient) {
      Ingredient.forge({
        name: ingredient.name,
        amount: ingredient.amount,
        recipe_id: recipeEntry.id
      })
      .save()
      .then(function (ingredientEntry) {
        console.log('saved: ' + ingredientEntry);
      })
      .catch(function (err) {
        console.log('error saving ingredients: ' + err);
      });
    });
    recipe.directions.forEach(function(step) {
      Step.forge({
        text: step,
        recipe_id: recipeEntry.id
      })
      .save()
      .then(function (stepEntry) {
        console.log('saved: ' + stepEntry);
      })
      .catch(function (err) {
        console.log('error saving: ' + err);
      });
    });

  })
  .catch(function (err) {
    console.log(err);
  });
});
