import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';

const logger = createLogger({
  collapsed: true,
});

const reducer = ( state = {}, action ) => state;
const initialState = {};
const middleware = applyMiddleware(
  logger
);

const store = createStore( reducer, initialState, middleware );

export default store;

