import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import reducers from './reducers';

const logger = createLogger({
  collapsed: true,
});

const initialState = { recipes: [] };
const middleware = applyMiddleware(
  thunk,
  apiMiddleware,
  logger
);

const store = createStore( reducers, initialState, middleware );

/* istanbul ignore next */
if ( module.hot ) {
  module.hot.accept( './reducers', () => {
    const nextRootReducer = require( './reducers' ).default;
    store.replaceReducer( nextRootReducer );
  })
}

if ( global.window ) {
  global.window.store = store;
}

export default store;

