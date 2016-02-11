import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import ListItem from 'material-ui/lib/lists/list-item';
import { routeActions } from 'react-router-redux';

class RecipeListItem extends Component {
  constructor() {
    super();
    this.handleItemSelect = this.handleItemSelect.bind(this);
  }

  handleItemSelect() {
    const {goToUrl, recipe} = this.props;
    goToUrl(`/recipes/${recipe.id}`);
  }

  render() {
    const {recipe, selectedRecipeId} = this.props;

    const style = selectedRecipeId === recipe.id ? {backgroundColor: 'rgba(0, 0, 0, 0.2)'} : {};
    return (
      <ListItem value={recipe.id} onTouchTap={this.handleItemSelect} style={style}>
        {recipe.name}
      </ListItem>
    );
  }
}

RecipeListItem.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeListItem);
