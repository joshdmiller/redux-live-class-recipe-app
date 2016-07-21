import FetchPolyfill from 'whatwg-fetch';

export default () => dispatch => {
  dispatch({ type: 'FETCH_RECIPES_START' });

  return fetch( 'http://localhost:3000/recipes' )
    .then( res => {
      if ( res.status < 200 || res.status >= 300 ) {
        throw new Error();
      }

      return res.json();
    })
    .then( recipes => {
      dispatch({
        type: 'LOAD_RECIPES',
        recipes
      });
    })
    .catch( () => {
      dispatch({ type: 'FETCH_RECIPES_ERROR' });
    });
};

