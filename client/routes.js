import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import RecipeListPage from './containers/RecipeListPage';
import RecipeDetailPage from './containers/RecipeDetailPage';
import RecipeEditPage from './containers/RecipeEditPage';
import RecipeAddPage from './containers/RecipeAddPage';

export default (
  <Route path="/" component={App}>
    <Route path="/login/:name" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/recipes" component={RecipeListPage} /> 
    <Route path="/recipes/add" component={RecipeAddPage} /> 
    <Route path="/recipes/:recipeId" component={RecipeDetailPage} />
    <Route path="/recipes/:recipeId/edit" component={RecipeEditPage} />
  </Route>
);
