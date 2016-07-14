import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import recipes from './recipes';

export default combineReducers({
  recipes,
  routing,
});

