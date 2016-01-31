import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <h1>App container</h1>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
