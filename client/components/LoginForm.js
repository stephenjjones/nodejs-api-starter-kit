import React, { Component, PropTypes } from 'react';
import {reduxForm} from 'redux-form';

class LoginForm extends Component {
  render() {
    const {fields: {email, password}, handleSubmit, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password}/>
        </div>
        <button type="submit" disabled={submitting}>Submit</button>
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
