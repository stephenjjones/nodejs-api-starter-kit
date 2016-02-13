import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/lib/floating-action-button';

import { routeActions } from 'react-router-redux';

class ViewRecipeButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {goToUrl, recipeId} = this.props;
    const editUrl = `/recipes/${recipeId}`;
    goToUrl(editUrl);
  }

  render() {
    return (
      <FloatingActionButton onMouseUp={this.handleClick} mini={true} style={{float: 'right', marginTop: '10px', marginRight: '10px'}}>
        <i className="material-icons">chevron_left</i>
      </FloatingActionButton>
    );
  }
}

ViewRecipeButton.propTypes = {
  goToUrl: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  const {routing: {location}} = state;
  return {
    path: location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToUrl: (url) => dispatch(routeActions.push(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRecipeButton);
