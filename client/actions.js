import { routeActions } from 'react-router-redux';

import { CALL_API, Schemas } from 'middleware/api';

export const ADD_RECIPE_REQUEST = 'ADD_RECIPE_REQUEST';
export const ADD_RECIPE_SUCCESS = 'ADD_RECIPE_SUCCESS';
export const ADD_RECIPE_FAILURE = 'ADD_RECIPE_FAILURE';

export function addRecipe(data) {
  return {
    [CALL_API]: {
      types: [ ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE ],
      endpoint: `/recipes`,
      schema: Schemas.RECIPE,
      transitionToUrlOnSuccess: (response) => `/recipes/${response.result}/edit`,
      requestOptions: {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      },
      payload: { data }
    }
  };
}

export const EDIT_RECIPE_REQUEST = 'EDIT_RECIPE_REQUEST';
export const EDIT_RECIPE_SUCCESS = 'EDIT_RECIPE_SUCCESS';
export const EDIT_RECIPE_FAILURE = 'EDIT_RECIPE_FAILURE';

export function editRecipe(itemId, data) {
  return {
    [CALL_API]: {
      types: [ EDIT_RECIPE_REQUEST, EDIT_RECIPE_SUCCESS, EDIT_RECIPE_FAILURE ],
      endpoint: `/recipes/${itemId}`,
      schema: Schemas.RECIPE,
      requestOptions: {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      },
      payload: { data }
    }
  };
}

export const ADD_STEP_REQUEST = 'ADD_STEP_REQUEST';
export const ADD_STEP_SUCCESS = 'ADD_STEP_SUCCESS';
export const ADD_STEP_FAILURE = 'ADD_STEP_FAILURE';

export function addStep(recipeId, data) {
  return {
    [CALL_API]: {
      types: [ ADD_STEP_REQUEST, ADD_STEP_SUCCESS, ADD_STEP_FAILURE ],
      endpoint: `/recipes/${recipeId}/steps`,
      schema: Schemas.STEP,
      requestOptions: {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      },
      payload: { data }
    }
  };
}

export const EDIT_STEP_REQUEST = 'EDIT_STEP_REQUEST';
export const EDIT_STEP_SUCCESS = 'EDIT_STEP_SUCCESS';
export const EDIT_STEP_FAILURE = 'EDIT_STEP_FAILURE';

export function editStep(recipeId, itemId, data) {
  return {
    [CALL_API]: {
      types: [ EDIT_STEP_REQUEST, EDIT_STEP_SUCCESS, EDIT_STEP_FAILURE ],
      endpoint: `/recipes/${recipeId}/steps/${itemId}`,
      schema: Schemas.STEP,
      requestOptions: {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      },
      payload: { data }
    }
  };
}

export const ADD_INGREDIENT_REQUEST = 'ADD_INGREDIENT_REQUEST';
export const ADD_INGREDIENT_SUCCESS = 'ADD_INGREDIENT_SUCCESS';
export const ADD_INGREDIENT_FAILURE = 'ADD_INGREDIENT_FAILURE';

export function addIngredient(recipeId, data) {
  return {
    [CALL_API]: {
      types: [ ADD_INGREDIENT_REQUEST, ADD_INGREDIENT_SUCCESS, ADD_INGREDIENT_FAILURE ],
      endpoint: `/recipes/${recipeId}/ingredients`,
      schema: Schemas.INGREDIENT,
      requestOptions: {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      },
      payload: { data }
    }
  };
}

export const EDIT_INGREDIENT_REQUEST = 'EDIT_INGREDIENT_REQUEST';
export const EDIT_INGREDIENT_SUCCESS = 'EDIT_INGREDIENT_SUCCESS';
export const EDIT_INGREDIENT_FAILURE = 'EDIT_INGREDIENT_FAILURE';

export function editIngredient(recipeId, itemId, data) {
  return {
    [CALL_API]: {
      types: [ EDIT_INGREDIENT_REQUEST, EDIT_INGREDIENT_SUCCESS, EDIT_INGREDIENT_FAILURE ],
      endpoint: `/recipes/${recipeId}/ingredients/${itemId}`,
      schema: Schemas.INGREDIENT,
      requestOptions: {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      },
      payload: { data }
    }
  };
}

export const DELETE_RECIPE_REQUEST = 'DELETE_RECIPE_REQUEST';
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS';
export const DELETE_RECIPE_FAILURE = 'DELETE_RECIPE_FAILURE';

export function deleteRecipe(recipeId) {
  return {
    [CALL_API]: {
      types: [ DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, DELETE_RECIPE_FAILURE ],
      endpoint: `/recipes/${recipeId}`,
      schema: Schemas.RECIPE,
      transitionToUrlOnSuccess: () => `/recipes`,
      requestOptions: {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }
    }
  };
}

export const DELETE_STEP_REQUEST = 'DELETE_STEP_REQUEST';
export const DELETE_STEP_SUCCESS = 'DELETE_STEP_SUCCESS';
export const DELETE_STEP_FAILURE = 'DELETE_STEP_FAILURE';

export function deleteStep(recipeId, itemId) {
  return {
    [CALL_API]: {
      types: [ DELETE_STEP_REQUEST, DELETE_STEP_SUCCESS, DELETE_STEP_FAILURE ],
      endpoint: `/recipes/${recipeId}/steps/${itemId}`,
      schema: Schemas.STEP,
      requestOptions: {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }
    }
  };
}

export const DELETE_INGREDIENT_REQUEST = 'DELETE_INGREDIENT_REQUEST';
export const DELETE_INGREDIENT_SUCCESS = 'DELETE_INGREDIENT_SUCCESS';
export const DELETE_INGREDIENT_FAILURE = 'DELETE_INGREDIENT_FAILURE';

export function deleteIngredient(recipeId, itemId) {
  return {
    [CALL_API]: {
      types: [ DELETE_INGREDIENT_REQUEST, DELETE_INGREDIENT_SUCCESS, DELETE_INGREDIENT_FAILURE ],
      endpoint: `/recipes/${recipeId}/ingredients/${itemId}`,
      schema: Schemas.INGREDIENT,
      requestOptions: {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }
    }
  };
}

export const ALL_RECIPE_REQUEST = 'ALL_RECIPE_REQUEST';
export const ALL_RECIPE_SUCCESS = 'ALL_RECIPE_SUCCESS';
export const ALL_RECIPE_FAILURE = 'ALL_RECIPE_FAILURE';

// Fetches a single recipe from recipe API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchAllRecipes() {
  return {
    [CALL_API]: {
      types: [ ALL_RECIPE_REQUEST, ALL_RECIPE_SUCCESS, ALL_RECIPE_FAILURE ],
      endpoint: `/recipes`,
      schema: Schemas.RECIPE_ARRAY,
      requestOptions: {
        credentials: 'same-origin'
      }
    }
  };
}

export function loadAllRecipes() {
  return (dispatch) => {
    return dispatch(fetchAllRecipes());
  };
}

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
      response => {
        dispatch({type: AUTHENTICATE_SUCCESS, payload: response.token});
        const nextUrl = 'http://localhost:3008/recipes';
        dispatch(routeActions.push(nextUrl));
      },
      error => dispatch({type: AUTHENTICATE_FAILURE, error})
    );
  };
}
