import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

//import LoginForm from 'components/LoginForm';
import { loadAllRecipes, addRecipe } from 'actions';
import RecipeInput from '../components/RecipeInput';

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
    const {recipes} = this.props;
    return (
      <div>
        <h1>Recipe List</h1>
        <ol>
          {recipes[1] && [1].map((recipe, index) => <li key={index}>{recipes[recipe].name}</li>)}
        </ol>
        <RecipeInput />
      </div>
    );
  }
}

RecipeListPage.propTypes = {
  loadRecipes: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  recipes: PropTypes.object
};

function mapStateToProps(state) {
  const {entities: {recipes}} = state;
  return {
    recipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecipes: () => dispatch(loadAllRecipes()),
    addItem: (data) => dispatch(addRecipe(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListPage);
