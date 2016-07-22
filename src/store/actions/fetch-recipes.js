import { CALL_API } from 'redux-api-middleware';

export default () => ({
  [ CALL_API ]: {
    endpoint: 'http://localhost:3000/recipes',
    method: 'GET',
    types: [
      'FETCH_RECIPES_START',
      'LOAD_RECIPES',
      'FETCH_RECIPES_ERROR',
    ],
  },
});

