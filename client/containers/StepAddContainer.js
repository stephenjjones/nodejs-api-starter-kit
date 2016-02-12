import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import StepForm from '../components/stepForm';
import { addStep } from '../actions';

class StepAddContainer extends Component {
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
      <StepForm formKey='new' onSubmit={this.handleSubmit} />
    );
  }
}

StepAddContainer.propTypes = {
  addItem: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (recipeId, data) => dispatch(addStep(recipeId, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepAddContainer);
