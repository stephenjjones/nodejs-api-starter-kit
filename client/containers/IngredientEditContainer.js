import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IngredientForm from '../components/IngredientForm';
import { editIngredient, deleteIngredient } from '../actions';

class IngredientEditContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(formData) {
    const {recipe, ingredient} = this.props;
    this.props.editItem(recipe.id, ingredient.id, formData);
  }

  handleDelete(e) {
    const {recipe, ingredient} = this.props;
    e.preventDefault();
    this.props.deleteItem(recipe.id, ingredient.id);
  }

  render() {
    const {ingredient} = this.props;
    return (
      <IngredientForm initialValues={ingredient} formKey={`${ingredient.id}`} onSubmit={this.handleSubmit} handleDelete={this.handleDelete} isNewForm={false}/>
    );
  }
}

IngredientEditContainer.propTypes = {
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  ingredient: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    editItem: (recipeId, itemId, data) => dispatch(editIngredient(recipeId, itemId, data)),
    deleteItem: (recipeId, itemId) => dispatch(deleteIngredient(recipeId, itemId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientEditContainer);
