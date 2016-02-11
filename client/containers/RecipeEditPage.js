import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { loadAllRecipes, addRecipe } from 'actions';
import RecipeEditContainer from '../containers/RecipeEditContainer';

function loadData(props) {
  props.loadRecipes();
}

class RecipeEditPage extends Component {
  constructor() {
    super();
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem(data) {
    const {addItem} = this.props;
    addItem(data);
  }

  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div>
        <h1>Recipe Edit</h1>
        <RecipeEditContainer />
      </div>
    );
  }
}

RecipeEditPage.propTypes = {
  recipe: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditPage);
