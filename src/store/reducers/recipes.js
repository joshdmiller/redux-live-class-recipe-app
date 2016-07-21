export default ( recipes = [], { type, ...payload } ) => {
  switch ( type ) {
    case 'ADD_RECIPE':
      return [ ...recipes, payload ];
    case 'LOAD_RECIPES':
      return [ ...payload.recipes ];
  }

  return recipes;
};

