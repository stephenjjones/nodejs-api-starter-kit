import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import paginate from './paginate';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities.
function entities(state = { users: {}, repos: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities);
  }

  return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  ingredientsByRecipe: paginate({
    mapActionToKey: action => action.recipeId,
    types: [
      ActionTypes.INGREDIENTS_REQUEST,
      ActionTypes.INGREDIENTS_SUCCESS,
      ActionTypes.INGREDIENTS_FAILURE
    ]
  })
});

const rootReducer = combineReducers({
  entities,
  pagination,
  errorMessage,
  routing: routeReducer
});


export default rootReducer;
