import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';

//import LoginForm from 'components/LoginForm';
import { loadAllRecipes } from 'actions';
import RecipeListItem from '../components/RecipeListItem';
import SearchForm from '../containers/SearchForm';

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
        <SearchForm />
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

function filteredRecipes(query, recipes) {
  const lowercaseQuery = query.toLowerCase();
  if (lowercaseQuery === '') {
    return Object.keys(recipes);
  }
  console.log(recipes);
  const filteredRecipes = Object.keys(recipes).filter(recipeId => recipes[recipeId].name.toLowerCase().indexOf(lowercaseQuery) > -1);
  return filteredRecipes;
}

function mapStateToProps(state, ownProps) {
  const {form: {search}, entities: {recipes}} = state;
  // placeholder
  const visibleRecipes = filteredRecipes(search && search.query.value || '', recipes);
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
