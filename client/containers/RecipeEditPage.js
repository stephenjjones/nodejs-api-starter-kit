import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { loadAllRecipes } from 'actions';
import RecipeEditContainer from '../containers/RecipeEditContainer';
import StepAddContainer from '../containers/StepAddContainer';
import StepEditContainer from '../containers/StepEditContainer';

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
    const {steps} = this.props;
    const recipeSteps = recipe.steps.map((stepId) => steps[stepId]);
    return (
      <div>
        <h1>Recipe Edit</h1>
        <RecipeEditContainer recipe={recipe} />
        {recipeSteps.map((step) => <StepEditContainer key={step.id} step={step} recipe={recipe}/>)}
        <StepAddContainer recipe={recipe} />
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
  steps: PropTypes.object
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
