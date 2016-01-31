/* @flow weak */

import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import api from 'middleware/api';
import rootReducer from 'reducers';

import DevTools from 'containers/DevTools';

const reduxRouterMiddleware = syncHistory(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(thunk, api, reduxRouterMiddleware, createLogger()),
  DevTools.instrument()
)(createStore);


// Optionally Change: https://github.com/rackt/redux/releases/tag/v3.1.0
export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
