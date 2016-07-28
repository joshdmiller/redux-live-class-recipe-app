import { Map, List, fromJS } from 'immutable';

export default ( recipes = List(), { type, ...payload } ) => {
  switch ( type ) {
    case 'ADD_RECIPE':
      return recipes.push( Map( payload ) );
    case 'LOAD_RECIPES':
      return fromJS( payload.payload );
    case 'DELETE_RECIPE':
      return recipes.filterNot( recipe => recipe.id === payload.id );
  }

  return recipes;
};

