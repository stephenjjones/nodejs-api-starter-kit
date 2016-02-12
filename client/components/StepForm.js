import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';

const style = {
  width: 400,
  margin: 20,
  textAlign: 'center'
};

class StepForm extends Component {
  render() {
    const { fields: { text }, handleSubmit, submitting } = this.props;
    return (
      <Paper style={style} zDepth={1} rounded={false}>
        <form onSubmit={handleSubmit}>
          <TextField
            hintText="Step"
            type="text"
            underlineShow={true}
            {...text}
          />
          <Divider />
          <RaisedButton type="submit" primary={true} disabled={submitting} label="Submit"/>
        </form>
      </Paper>
    );
  }
}

StepForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

StepForm = reduxForm({
  form: 'step',
  fields: ['text']
})(StepForm);

export default StepForm;
