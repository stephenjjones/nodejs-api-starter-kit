import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import Login from './containers/Login';
import RecipeListPage from './containers/RecipeListPage';

export default (
  <Route path="/" component={App}>
    <Route path="/login/:name" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/recipes" component={RecipeListPage} />
  </Route>
);
