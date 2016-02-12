import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import StepForm from '../components/stepForm';
import { editStep } from '../actions';

class StepEditContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formData) {
    const {recipe, step} = this.props;
    this.props.editItem(recipe.id, step.id, formData);
  }

  render() {
    const {step} = this.props;
    return (
      <StepForm initialValues={step} formKey={step.id} onSubmit={this.handleSubmit} />
    );
  }
}

StepEditContainer.propTypes = {
  editItem: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    editItem: (recipeId, itemId, data) => dispatch(editStep(recipeId, itemId, data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepEditContainer);
