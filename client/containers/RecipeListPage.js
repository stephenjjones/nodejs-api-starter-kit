import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/lib/card/card';

//import LoginForm from 'components/LoginForm';
import { loadAllRecipes } from 'actions';
import RecipeGridItem from '../components/RecipeGridItem';


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
      <div style={{marginLeft: '300px', marginRight: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', cursor: 'pointer'}}>
        {visibleRecipes && visibleRecipes.map((recipeId, index) => <Card style={{marginTop: '8px'}}key={index}><RecipeGridItem recipe={recipes[recipeId]}/></Card>)}
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
