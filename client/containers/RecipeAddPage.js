import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import List from 'material-ui/lib/lists/list';

import { loadAllRecipes, addRecipe } from 'actions';
import RecipeAddContainer from '../containers/RecipeAddContainer';
//import StepAddContainer from '../containers/StepAddContainer';
//import IngredientAddContainer from '../containers/IngredientAddContainer';

function loadData(props) {
  props.loadRecipes();
}

class RecipeEditPage extends Component {
  constructor() {
    super();
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleAddItem(data) {
    const {addItem} = this.props;
    addItem(data);
  }

  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div style={{marginTop: '50px', width: '600px'}}>
        <Card>
          <CardText>
            <RecipeAddContainer />
            <div>
              <h3>Ingredients</h3>
              <List>
              </List>
            </div>
            <div>
              <h3>Directions</h3>
              <List>
              </List>
            </div>
          </CardText>
        </Card>
      </div>
    );
  }
}

RecipeEditPage.propTypes = {
  recipe: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {entities: {recipes}} = state;
  return {
    recipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadRecipes: () => dispatch(loadAllRecipes()),
    addItem: (data) => dispatch(addRecipe(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEditPage);
