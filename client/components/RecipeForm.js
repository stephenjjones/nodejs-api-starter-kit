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

class RecipeForm extends Component {
  render() {
    const { fields: { name, category, overview }, handleSubmit, submitting } = this.props;
    return (
      <Paper style={style} zDepth={1} rounded={false}>
        <form onSubmit={handleSubmit}>
          <TextField
            hintText="Name"
            type="text"
            underlineShow={true}
            {...name}
          />
          <TextField
            hintText="Category"
            type="text"
            underlineShow={true}
            {...category}
          />
          <TextField
            hintText="Overview"
            type="text"
            underlineShow={true}
            {...overview}
          />
          <Divider />
          <RaisedButton type="submit" primary={true} disabled={submitting} label="Submit"/>
        </form>
      </Paper>
    );
  }
}

RecipeForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

RecipeForm = reduxForm({
  form: 'recipe',
  fields: ['name', 'category', 'overview']
})(RecipeForm);

export default RecipeForm;
