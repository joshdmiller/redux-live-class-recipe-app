export default ( recipes = [], { type, ...payload } ) => {
  switch ( type ) {
    case 'ADD_RECIPE':
      return [ ...recipes, payload ];
  }

  return recipes;
};

