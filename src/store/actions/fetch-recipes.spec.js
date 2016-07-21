import test from 'tape';
import spyOn from '../../spy';

import fetchRecipes from './fetch-recipes';

const recipes = [ { id: '1' }, { id: '2', }, { id: '3' } ];
const spies = {
  dispatch () {},
  fetchSuccess () { return new Promise( res => res( recipes ) ) },
};

const dispatchSpy = spyOn( spies, 'dispatch' );
const fetchSuccessSpy = spyOn( spies, 'fetchSuccess' );

test( 'fetchRecipes action', t => {
  const _oldFetch = global.fetch;
  global.fetch = spies.fetchSuccess;

  let actual, expected, thunkFn, result;
  t.plan( 6 );

  thunkFn = fetchRecipes();
  expected = 'function';
  actual = typeof thunkFn;
  t.equal( actual, expected, 'should return a function' );

  dispatchSpy.reset();
  fetchSuccessSpy.reset();

  thunkFn = fetchRecipes();
  result = thunkFn( spies.dispatch );

  expected = 1;
  actual = dispatchSpy.calls.length;
  t.equal( actual, expected, 'should dispatch FETCH_RECIPES_START for a new recipe' );

  expected = 'FETCH_RECIPES_START';
  actual = dispatchSpy.calls[0].args[0].type;
  t.equal( actual, expected, 'should dispatch FETCH_RECIPES_START for a new recipe' );

  expected = 'function';
  actual = typeof result.then;
  t.equal( actual, expected, 'should return a promise for a new recipe' );

  global.fetch = spies.fetchSuccess;
  expected = 1;
  actual = fetchSuccessSpy.calls.length;
  t.equal( actual, expected, 'should call fetch' );

  expected = 'http://localhost:3000/recipes';
  actual = fetchSuccessSpy.calls[0].args[0];
  t.equal( actual, expected, 'should fetch the recipe list' );

  // TODO: test that dispatch is called when the promise returns successfully and unsuccessfully

  global.fetch = _oldFetch;
});

