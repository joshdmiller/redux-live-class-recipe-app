import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

import reducers from './reducers';
import data from '../static-data';
import { dehydrate, rehydrate } from './persist';

const logger = createLogger({
  collapsed: true,
});

const initialState = rehydrate( data );
const middleware = applyMiddleware(
  logger,
  dehydrate
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

