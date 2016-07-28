import FetchPolyfill from 'whatwg-fetch';
import data from '../../static-data';

const getRecipe = id => {
  if ( ! global.window ) {
    // make internal API call, e.g. to db
    return new Promise( ( resolve, reject ) => {
      const recipe = data.recipes.find( recipe => recipe.id === id );

      if ( ! recipe ) {
        throw new Error();
      }

      resolve( recipe );
    });
  }

  // In browser, fetch over the wire
  return fetch( `http://localhost:3000/recipes/${id}` )
    .then( res => {
      if ( res.status < 200 || res.status >= 300 ) {
        throw new Error();
      }

      return res.json();
    });
};

export default id => ( dispatch, getState ) => {
  const recipes = getState().recipes;
  const recipe = recipes.find( r => r.get( 'id' ) === id );

  // If this recipe is already in our store, we're not going to re-load it over the wire.
  if ( recipe ) {
    return null;
  }

  dispatch({ type: 'FETCH_RECIPE_START' });

  return getRecipe( id )
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

