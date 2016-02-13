import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Checkbox from 'material-ui/lib/checkbox';

import EditRecipeButton from './EditRecipeButton';

class RecipeDetailPage extends Component {

  renderLoadingScreen() {
    return (
      <div>loading...</div>
    );
  }

  renderComponents() {
    const {recipe, steps, ingredients} = this.props;
    const recipeSteps = recipe.steps.map((stepId) => steps[stepId]);
    const recipeIngredients = recipe.ingredients.map((ingredientId) => ingredients[ingredientId]);

    return (
      <div style={{marginTop: '50px', width: '600px'}}>
        <Card>
          <EditRecipeButton />
          <CardTitle style={{width: '80%'}} title={recipe.name} subtitle={recipe.category}>
          </CardTitle>
          <CardText>
            {recipe.overview}
            <h3>Ingredients</h3>
            <List>
              {recipeIngredients.map((ingredient) => <div key={`${ingredient.id}`}><ListItem leftCheckbox={<Checkbox />} primaryText={ingredient.name} secondaryText={ingredient.amount} /><Divider inset={true} /></div>)}
            </List>
            <h3>Directions</h3>
            <List>
              {recipeSteps.map((step) => <div key={`${step.id}`}><ListItem leftCheckbox={<Checkbox />} primaryText={step.text} /><Divider inset={true} /></div>)}
            </List>
          </CardText>
        </Card>
      </div>
    );
  }

  render() {
    const {recipe} = this.props;
    if (recipe) {
      return this.renderComponents();
    } else {
      return this.renderLoadingScreen();
    }
  }
}

RecipeDetailPage.propTypes = {
  recipe: PropTypes.object,
  steps: PropTypes.object,
  ingredients: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {entities: {recipes, steps, ingredients}} = state;
  const recipeId = Number(ownProps.params.recipeId);
  return {
    recipe: recipes[recipeId],
    recipes,
    steps,
    ingredients
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailPage);
