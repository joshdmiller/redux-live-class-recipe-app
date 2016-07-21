import FetchPolyfill from 'whatwg-fetch';

export default id => dispatch => {
  dispatch({ type: 'DELETE_RECIPE_START' });

  return fetch( `http://localhost:3000/recipes/${id}`, { method: 'DELETE' } )
    .then( res => {
      if ( res.status < 200 || res.status >= 300 ) {
        throw new Error();
      }

      return res.json();
    })
    .then( () => {
      dispatch({
        type: 'DELETE_RECIPE',
        id,
      });
    })
    .catch( () => {
      dispatch({ type: 'DELETE_RECIPE_ERROR' });
    });
};

