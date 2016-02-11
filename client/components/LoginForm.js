import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';

const style = {
  marginLeft: 20,
  width: '350px'
};

class LoginForm extends Component {
  render() {
    const {fields: {email, password}, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Paper zDepth={2}>
          <TextField
            hintText="Email"
            type="email"
            underlineShow={false}
            style={style}
            {...email}
          />
          <Divider />
          <TextField
            hintText="Password"
            type="password"
            underlineShow={false}
            style={style}
            {...password}
          />
          <Divider />
        </Paper>
        <br />
        <RaisedButton type="submit" primary={true} disabled={submitting} label="Submit"/>
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

LoginForm = reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(LoginForm);

export default LoginForm;
