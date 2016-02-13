import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import paginate from './paginate';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';


const users = (state = {}, action) => {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.users) {
      return merge({}, state, action.response.entities.users);
    }
    return state;
  }
};

const recipes = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_STEP_SUCCESS:
    let stepId = action.response.result;
    let recipeId = action.response.entities.steps[stepId].recipeId;
    let currentSteps = state[recipeId].steps || [];
    let updatedSteps = [...currentSteps, stepId];
    let updatedRecipe = {...state[recipeId], steps: updatedSteps};
    return {
      ...state,
      [recipeId]: updatedRecipe
    };
  case ActionTypes.ADD_INGREDIENT_SUCCESS:
    let ingredientId = action.response.result;
    recipeId = action.response.entities.ingredients[ingredientId].recipeId;
    let currentIngredients = state[recipeId].ingredients || [];
    let updatedIngredients = [...currentIngredients, ingredientId];
    updatedRecipe = {...state[recipeId], ingredients: updatedIngredients};
    return {
      ...state,
      [recipeId]: updatedRecipe
    };
  case ActionTypes.DELETE_RECIPE_SUCCESS:
    recipeId = action.response.result;
    let newState = {...state};
    delete newState[recipeId];
    return newState;
  case ActionTypes.DELETE_STEP_SUCCESS:
    stepId = action.response.result;
    recipeId = action.response.entities.steps[stepId].recipeId;
    currentSteps = state[recipeId].steps || [];
    updatedSteps = currentSteps.filter((id) => id !== stepId);
    updatedRecipe = {...state[recipeId], steps: updatedSteps};
    return {
      ...state,
      [recipeId]: updatedRecipe
    };
  case ActionTypes.DELETE_INGREDIENT_SUCCESS:
    ingredientId = action.response.result;
    recipeId = action.response.entities.ingredients[ingredientId].recipeId;
    currentIngredients = state[recipeId].ingredients || [];
    updatedIngredients = currentIngredients.filter((id) => id !== ingredientId);
    updatedRecipe = {...state[recipeId], ingredients: updatedIngredients};
    return {
      ...state,
      [recipeId]: updatedRecipe
    };
  default:
    if (action.response && action.response.entities && action.response.entities.recipes) {
      return merge({}, state, action.response.entities.recipes);
    }
    return state;
  }
};

const steps = (state = {}, action) => {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.steps) {
      return merge({}, state, action.response.entities.steps);
    }
    return state;
  }
};

const ingredients = (state = {}, action) => {
  switch (action.type) {
  default:
    if (action.response && action.response.entities && action.response.entities.ingredients) {
      return merge({}, state, action.response.entities.ingredients);
    }
    return state;
  }
};

const entities = combineReducers({
  users,
  recipes,
  steps,
  ingredients
});

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

const search = (state = {}, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  search,
  entities,
  pagination,
  errorMessage,
  routing: routeReducer,
  form: formReducer.plugin({
    step: (state, action) => {
      switch(action.type) {
      case ActionTypes.ADD_STEP_SUCCESS:
        return { ...state, 'new': undefined };
      default:
        return state;
      }
    },
    ingredient: (state, action) => {
      switch(action.type) {
      case ActionTypes.ADD_INGREDIENT_SUCCESS:
        return { ...state, 'new': undefined };
      default:
        return state;
      }
    }
  })
});


export default rootReducer;
