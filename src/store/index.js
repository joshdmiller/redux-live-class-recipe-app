import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { List, fromJS } from 'immutable';

import reducers from './reducers';

const logger = createLogger({
  collapsed: true,
});

const middleware = applyMiddleware(
  thunk,
  apiMiddleware,
  logger
);

export default () => {
  let initialState = { recipes: new List() };

  if ( global.window && global.window.__INITIAL_STATE__ ) {
    initialState = global.window.__INITIAL_STATE__;
    Object.keys( initialState ).forEach( k => initialState[ k ] = fromJS( initialState[ k ] ) );
  }

  const store = createStore( reducers, initialState, middleware );

  if ( global.window ) {
    global.window.store = store;
  }

  /* istanbul ignore next */
  if ( module.hot ) {
    module.hot.accept( './reducers', () => {
      const nextRootReducer = require( './reducers' ).default;
      store.replaceReducer( nextRootReducer );
    })
  }

  return store;
};

