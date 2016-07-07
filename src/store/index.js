import { createStore } from 'redux';

const reducer = ( state = {}, action ) => state;
const initialState = {};
const store = createStore( reducer, initialState );

export default store;

