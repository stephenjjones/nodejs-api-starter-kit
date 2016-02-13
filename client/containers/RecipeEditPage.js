import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';
//import Divider from 'material-ui/lib/divider';

import { loadAllRecipes } from 'actions';
import RecipeEditContainer from '../containers/RecipeEditContainer';
import StepAddContainer from '../containers/StepAddContainer';
import StepEditContainer from '../containers/StepEditContainer';
import IngredientAddContainer from '../containers/IngredientAddContainer';
import IngredientEditContainer from '../containers/IngredientEditContainer';
import ViewRecipeButton from '../containers/ViewRecipeButton';

function loadData(props) {
  props.loadRecipes();
}

class RecipeEditPage extends Component {
  componentDidMount() {
    loadData(this.props);
  }

  renderLoadingScreen() {
    return (
      <div>loading...</div>
    );
  }

  renderComponents(recipe) {
    const {steps, ingredients} = this.props;
    const recipeSteps = recipe.steps ? recipe.steps.map((stepId) => steps[stepId]) : [];
    const recipeIngredients = recipe.ingredients ? recipe.ingredients.map((ingredientId) => ingredients[ingredientId]) : [];
    return (
      <div style={{marginTop: '50px', width: '600px'}}>
        <Card>
          <ViewRecipeButton recipeId={recipe.id}/>
          <CardText>
            <RecipeEditContainer recipe={recipe} />
            <div>
              <h3>Ingredients</h3>
              <List>
                {recipeIngredients.map((ingredient) => <div key={`${ingredient.id}`}><IngredientEditContainer ingredient={ingredient} recipe={recipe}/></div>)}
                <IngredientAddContainer recipe={recipe} />
              </List>
            </div>
            <div>
              <h3>Directions</h3>
              <List>
                {recipeSteps.map((step) => <div key={`${step.id}`}><StepEditContainer step={step} recipe={recipe}/></div>)}
                <StepAddContainer recipe={recipe} />
              </List>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }

  render() {
    const {recipeId, recipes} = this.props;
    const recipe = recipes && recipes[recipeId];

    if (recipe) {
      return this.renderComponents(recipe);
    } else {
      return this.renderLoadingScreen();
    }
  }
}

RecipeEditPage.propTypes = {
  recipeId: PropTypes.number.isRequired,
  recipes: PropTypes.object,
  steps: PropTypes.object,
  ingredients: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {entities: {recipes, steps, ingredients}} = state;
  return {
    recipeId: Number(ownProps.params.recipeId),
    recipes,
    steps,
    ingredients
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecipes: () => dispatch(loadAllRecipes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditPage);
