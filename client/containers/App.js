import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <AppBar
          title='Karens Kitchen'
          iconClassNameRight='muidocs-icon-navigation-expand-more'
        />
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
