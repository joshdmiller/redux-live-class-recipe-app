import { List } from 'immutable';

export default ( recipes = new List(), { type, ...payload } ) => {
  switch ( type ) {
    case 'ADD_RECIPE':
      return recipes.push( payload );
    case 'LOAD_RECIPES':
      return new List( payload.payload );
    case 'DELETE_RECIPE':
      return recipes.filterNot( recipe => recipe.id === payload.id );
  }

  return recipes;
};

