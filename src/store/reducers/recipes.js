export default ( recipes = [], { type, ...payload } ) => {
  switch ( type ) {
    case 'ADD_RECIPE':
      return [ ...recipes, payload ];
    case 'LOAD_RECIPES':
      return [ ...payload.payload ];
    case 'DELETE_RECIPE':
      return recipes.filter( recipe => recipe.id !== payload.id );
  }

  return recipes;
};

