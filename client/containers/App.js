import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import RecipeListNav from './RecipeListNav';

import AddRecipeButton from './AddRecipeButton';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const { children, params, location } = this.props;

    const isAddPageActive = location.pathname === '/recipes/add' ? true : false;

    return (
      <div>
        <AppBar
          title='Karens Kitchen'
          showMenuIconButton={false}
          zDepth={0}
        />
        <RecipeListNav params={params} isOpen={this.state.open}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          {children}
        </div>
        <AddRecipeButton disabled={isAddPageActive} style={{position: 'fixed', bottom: 20, right: 20}}/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};
