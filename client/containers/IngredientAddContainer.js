import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IngredientForm from '../components/IngredientForm';
import { addIngredient } from '../actions';

class IngredientAddContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const {recipe} = this.props;
    this.props.addItem(recipe.id, formData);
  }

  render() {
    return (
      <IngredientForm formKey='new' onSubmit={this.handleSubmit} isNewForm={true} />
    );
  }
}

IngredientAddContainer.propTypes = {
  addItem: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (recipeId, data) => dispatch(addIngredient(recipeId, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientAddContainer);
