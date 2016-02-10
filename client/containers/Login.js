import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from 'components/LoginForm';
import { authenticateUser } from 'actions';

class Login extends Component {
  handleSubmit(data) {
    const {authenticateUser} = this.props;
    authenticateUser(data.email, data.password);
  }

  render() {
    return (
      <div>
        <h1>Login container</h1>
        <LoginForm submitting={false} onSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }
}

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
