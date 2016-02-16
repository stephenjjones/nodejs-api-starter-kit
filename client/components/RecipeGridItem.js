import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CardHeader from 'material-ui/lib/card/card-header';
import { routeActions } from 'react-router-redux';

class RecipeGridItem extends Component {
  constructor() {
    super();
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  handleItemSelect() {
    const {goToUrl, recipe} = this.props;
    goToUrl(`/recipes/${recipe.id}`);
  }

  render() {
    const {recipe} = this.props;

    return (
      <CardHeader
        title={recipe.name}
        subtitle={recipe.category}
        style={{width: '250px'}}
        value={recipe.id} onTouchTap={this.handleItemSelect}
      />
    );
  }
}

RecipeGridItem.propTypes = {
  goToUrl: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGridItem);
