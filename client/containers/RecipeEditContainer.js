import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RecipeForm from '../components/RecipeForm';
import { editRecipe, deleteRecipe } from '../actions';

class RecipeEditContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(formData) {
    const {recipe} = this.props;
    this.props.editItem(recipe.id, formData);
  }

  handleDelete(e) {
    const {recipe} = this.props;
    e.preventDefault();
    this.props.deleteItem(recipe.id);
  }

  render() {
    const {recipe} = this.props;
    return (
      <RecipeForm initialValues={recipe} formKey={`${recipe.id}`} onSubmit={this.handleSubmit} handleDelete={this.handleDelete} />
    );
  }
}

RecipeEditContainer.propTypes = {
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    editItem: (itemId, data) => dispatch(editRecipe(itemId, data)),
    deleteItem: (recipeId) => dispatch(deleteRecipe(recipeId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditContainer);
