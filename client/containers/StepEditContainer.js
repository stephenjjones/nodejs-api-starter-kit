import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import StepForm from '../components/stepForm';
import { editStep, deleteStep } from '../actions';

class StepEditContainer extends Component {
  constructor(props) {
    super(props);  
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(formData) {
    const {recipe, step} = this.props;
    this.props.editItem(recipe.id, step.id, formData);
  }

  handleDelete(e) {
    const {recipe, step} = this.props;
    e.preventDefault();
    this.props.deleteItem(recipe.id, step.id);
  }

  render() {
    const {step} = this.props;
    return (
      <StepForm initialValues={step} formKey={`${step.id}`} onSubmit={this.handleSubmit} handleDelete={this.handleDelete} isNewForm={false} />
    );
  }
}

StepEditContainer.propTypes = {
  editItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  step: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    editItem: (recipeId, itemId, data) => dispatch(editStep(recipeId, itemId, data)),
    deleteItem: (recipeId, itemId) => dispatch(deleteStep(recipeId, itemId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StepEditContainer);
