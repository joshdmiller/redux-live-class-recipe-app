import test from 'tape';
import { CALL_API } from 'redux-api-middleware';

import fetchRecipes from './fetch-recipes';

test( 'fetchRecipes action', t => {
  let actual, expected, action;
  t.plan( 2 );

  action = fetchRecipes();
  expected = 'object';
  actual = typeof action;
  t.equal( actual, expected, 'should return an' );

  t.ok( action[ CALL_API ], 'should have the CALL_API key' );
});

