import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';


class RecipeDetailPage extends Component {

  renderLoadingScreen() {
    return (
      <div>loading...</div>
    );
  }

  renderComponents() {
    const {recipe} = this.props;
    return (
      <div>{recipe.name}</div>
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
  recipe: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  const {entities: {recipes}} = state;
  const recipeId = Number(ownProps.params.recipeId);
  return {
    recipe: recipes[recipeId],
    recipes
  };
}

function mapDispatchToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailPage);
