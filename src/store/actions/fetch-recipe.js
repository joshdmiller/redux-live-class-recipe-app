import FetchPolyfill from 'whatwg-fetch';

export default id => ( dispatch, getState ) => {
  const recipes = getState().recipes;
  const recipe = recipes.find( r => r.id === id );

  // If this recipe is already in our store, we're not going to re-load it over the wire.
  if ( recipe ) {
    return null;
  }

  dispatch({ type: 'FETCH_RECIPE_START' });

  return fetch( `http://localhost:3000/recipes/${id}` )
    .then( res => {
      if ( res.status < 200 || res.status >= 300 ) {
        throw new Error();
      }

      return res.json();
    })
    .then( recipe => {
      dispatch({
        type: 'ADD_RECIPE',
        ...recipe
      });
    })
    .catch( () => {
      dispatch({ type: 'FETCH_RECIPE_ERROR' });
    });
};

