import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

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
    const {recipes, visibleRecipes} = this.props;

    return (
      <div>
        <h1>Recipe List</h1>
        <ol style={{width:'500px'}}>
          {visibleRecipes && visibleRecipes.map((recipeId, index) => <li key={index}><RecipeListItem recipe={recipes[recipeId]}/></li>)}
        </ol>
      </div>
    );
  }
}

RecipeListPage.propTypes = {
  loadRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object,
  visibleRecipes: PropTypes.array
};

function mapStateToProps(state) {
  const {entities: {recipes}} = state;
  const visibleRecipes = Object.keys(recipes);
  return {
    recipes,
    visibleRecipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecipes: () => dispatch(loadAllRecipes())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);
