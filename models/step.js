var bookshelf = require('./bookshelf');

require('./recipe');
var Step = bookshelf.Model.extend({
  tableName: 'steps',
  recipe: function() {
    return this.belongsTo('Recipe');
  }
});

var Steps = bookshelf.Collection.extend({
  model:Step 
});


module.exports = {
  Step: bookshelf.model('Step', Step),
  Steps: bookshelf.collection('Steps', Steps)
};
