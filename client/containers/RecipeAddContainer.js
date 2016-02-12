import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RecipeForm from '../components/RecipeForm';
import { addRecipe } from '../actions';

class RecipeAddContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  handleAddClick(formData) {
    this.props.addItem(formData);
  }

  render() {
    return (
      <RecipeForm formKey='new' onSubmit={this.handleAddClick} />
    );
  }
}

RecipeAddContainer.propTypes = {
  addItem: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (data) => dispatch(addRecipe(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAddContainer);
