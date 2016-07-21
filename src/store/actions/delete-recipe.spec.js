import test from 'tape';
import spyOn from '../../spy';

import deleteRecipe from './delete-recipe';

const spies = {
  dispatch () {},
  fetchSuccess () { return new Promise( res => res( testRecipe ) ) },
};

const dispatchSpy = spyOn( spies, 'dispatch' );
const fetchSuccessSpy = spyOn( spies, 'fetchSuccess' );

test( 'deleteRecipe action', t => {
  const _oldFetch = global.fetch;
  global.fetch = spies.fetchSuccess;

  let actual, expected, thunkFn, id, result;
  t.plan( 7 );

  thunkFn = deleteRecipe();
  expected = 'function';
  actual = typeof thunkFn;
  t.equal( actual, expected, 'should return a function' );

  dispatchSpy.reset();
  fetchSuccessSpy.reset();

  id = 'new-id';
  thunkFn = deleteRecipe( id );
  result = thunkFn( spies.dispatch, spies.getState );

  expected = 1;
  actual = dispatchSpy.calls.length;
  t.equal( actual, expected, 'should dispatch DELETE_RECIPE_START for a new recipe' );

  expected = 'DELETE_RECIPE_START';
  actual = dispatchSpy.calls[0].args[0].type;
  t.equal( actual, expected, 'should dispatch DELETE_RECIPE_START for a new recipe' );

  expected = 'function';
  actual = typeof result.then;
  t.equal( actual, expected, 'should return a promise for a new recipe' );

  global.fetch = spies.fetchSuccess;
  expected = 1;
  actual = fetchSuccessSpy.calls.length;
  t.equal( actual, expected, 'should call fetch' );

  expected = `http://localhost:3000/recipes/${id}`;
  actual = fetchSuccessSpy.calls[0].args[0];
  t.equal( actual, expected, 'should hit the recipe resource' );

  expected = { method: 'DELETE' };
  actual = fetchSuccessSpy.calls[0].args[1];
  t.deepEqual( actual, expected, 'should send a DELETE api call' );

  // TODO: test that dispatch is called when the promise returns successfully and unsuccessfully

  global.fetch = _oldFetch;
});


