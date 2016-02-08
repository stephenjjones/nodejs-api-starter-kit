import { CALL_API, Schemas } from 'middleware/api';

export const RECIPE_REQUEST = 'RECIPE_REQUEST';
export const RECIPE_SUCCESS = 'RECIPE_SUCCESS';
export const RECIPE_FAILURE = 'RECIPE_FAILURE';

// Fetches a single recipe from recipe API.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchRecipe(recipeId) {
  return {
    [CALL_API]: {
      types: [ RECIPE_REQUEST, RECIPE_SUCCESS, RECIPE_FAILURE ],
      endpoint: `recipes/${recipeId}`,
      schema: Schemas.RECIPE,
      requestOptions: {
        credentials: 'same-origin'
      }
    }
  };
}

// Fetches a single recipe from recipe API unless it is cached.
// Relies on Redux Thunk middleware.
export function loadRecipe(recipeId, requiredFields = []) {
  return (dispatch, getState) => {
    const recipe = getState().entities.recipes[recipeId];
    if (recipe && requiredFields.every(key => recipe.hasOwnProperty(key))) {
      return null;
    }

    return dispatch(fetchRecipe(recipeId));
  };
}

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_SUCCESS = 'INGREDIENTS_SUCCESS';
export const INGREDIENTS_FAILURE = 'INGREDIENTS_FAILURE';

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
function fetchIngredients(recipeId, nextPageUrl) {
  return {
    recipeId,
    [CALL_API]: {
      types: [ INGREDIENTS_REQUEST, INGREDIENTS_SUCCESS, INGREDIENTS_FAILURE ],
      endpoint: nextPageUrl,
      schema: Schemas.INGREDIENT_ARRAY
    }
  };
}

// Fetches a page of ingredients for a particular recipe.
// Bails out if page is cached and user didn’t specifically request next page.
// Relies on Redux Thunk middleware.
export function loadIngredients(recipeId, nextPage) {
  return (dispatch, getState) => {
    const {
      nextPageUrl = `recipes/${recipeId}/ingredients`,
      pageCount = 0
    } = getState().pagination.ingredientsByRecipe[recipeId] || {};

    if (pageCount > 0 && !nextPage) {
      return null;
    }

    return dispatch(fetchIngredients(recipeId, nextPageUrl));
  };
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';

// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  };
}

export const AUTHENTICATE_REQUEST = 'AUTHENTICATE_REQUEST';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';

// Authenticates user and returns jwt auth token
function fetchAuthenticationToken(email, password) {
  const endpoint = 'http://localhost:3008/api/authenticate';
  const apiOptions = {
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
  };
  return (
    fetch(endpoint, apiOptions)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
}

// add in request action
export function authenticateUser(email, password) {
  return function (dispatch) {
    return fetchAuthenticationToken(email, password).then(
      response => dispatch({type: AUTHENTICATE_SUCCESS, payload: response.token}),
      error => dispatch({type: AUTHENTICATE_FAILURE, error})
    );
  };
}
