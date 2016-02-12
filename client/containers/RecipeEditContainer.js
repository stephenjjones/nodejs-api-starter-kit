import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RecipeForm from '../components/RecipeForm';
import { editRecipe } from '../actions';

class RecipeEditContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const {recipe} = this.props;
    this.props.editItem(recipe.id, formData);
  }

  render() {
    const {recipe} = this.props;
    return (
      <RecipeForm initialValues={recipe} formKey={`${recipe.id}`} onSubmit={this.handleSubmit} />
    );
  }
}

RecipeEditContainer.propTypes = {
  editItem: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    editItem: (itemId, data) => dispatch(editRecipe(itemId, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditContainer);
