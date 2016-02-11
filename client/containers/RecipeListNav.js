import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';
import TextField from 'material-ui/lib/text-field';
import List from 'material-ui/lib/lists/list';

//import LoginForm from 'components/LoginForm';
import { loadAllRecipes } from 'actions';
import RecipeListItem from '../components/RecipeListItem';

function loadData(props) {
  props.loadRecipes();
}

class RecipeListPage extends Component {
  componentDidMount() {
    loadData(this.props);
  }

  render() {
    const {recipes, visibleRecipes, selectedRecipeId} = this.props;

    return (
      <LeftNav docked={true} style={{top:'65px'}} open={true}>
        <TextField hintText='search recipe'/>
        <List>
          {visibleRecipes && visibleRecipes.map((recipeId, index) => <RecipeListItem key={index} selectedRecipeId={selectedRecipeId} recipe={recipes[recipeId]}/>)}
        </List>
      </LeftNav>
    );
  }
}

RecipeListPage.propTypes = {
  loadRecipes: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  recipes: PropTypes.object,
  visibleRecipes: PropTypes.array,
  selectedRecipeId: PropTypes.number
};

function mapStateToProps(state, ownProps) {
  const {entities: {recipes}} = state;
  const visibleRecipes = Object.keys(recipes);
  return {
    recipes,
    selectedRecipeId: Number(ownProps.params.recipeId),
    visibleRecipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecipes: () => dispatch(loadAllRecipes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);
