import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

import { routeActions } from 'react-router-redux';

class RecipeListItem extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {goToUrl} = this.props;
    goToUrl('/recipes/add');
  }

  render() {
    const {disabled} = this.props;
    return (
      <FloatingActionButton onMouseUp={this.handleClick} disabled={disabled} style={{position: 'fixed', bottom: 20, right: 20}}>
        <ContentAdd />
      </FloatingActionButton>
    );
  }
}

RecipeListItem.propTypes = {
  goToUrl: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goToUrl: (url) => dispatch(routeActions.push(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);
