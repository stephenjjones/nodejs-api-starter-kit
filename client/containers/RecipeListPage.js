import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

//import LoginForm from 'components/LoginForm';
import { loadAllRecipes, addRecipe } from 'actions';
import RecipeEditContainer from '../containers/RecipeEditContainer';
import RecipeListItem from '../components/RecipeListItem';

function loadData(props) {
  props.loadRecipes();
}

class RecipeListPage extends Component {
  constructor() {
    super();
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  componentDidMount() {
    loadData(this.props);
  }

  handleAddItem(data) {
    const {addItem} = this.props;
    addItem(data);
  }

  render() {
    const {recipes, visibleRecipes} = this.props;
    return (
      <div>
        <h1>Recipe List</h1>
        <RecipeEditContainer />
        <ol style={{width:'500px'}}>
          {visibleRecipes && visibleRecipes.map((recipeId, index) => <li key={index}><RecipeListItem recipe={recipes[recipeId]}/></li>)}
        </ol>
      </div>
    );
  }
}

RecipeListPage.propTypes = {
  loadRecipes: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
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
    loadRecipes: () => dispatch(loadAllRecipes()),
    addItem: (data) => dispatch(addRecipe(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);
