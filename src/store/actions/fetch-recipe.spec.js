import test from 'tape';
import { fromJS } from 'immutable';
import spyOn from '../../spy';

import fetchRecipe from './fetch-recipe';

const testRecipe = { id: '1' };
const spies = {
  getState () {
    return {
      recipes: fromJS([ testRecipe, { id: '2', }, { id: '3' } ]),
    };
  },

  dispatch () {},

  fetchSuccess () { return new Promise( res => res( testRecipe ) ) },
};

const getStateSpy = spyOn( spies, 'getState' );
const dispatchSpy = spyOn( spies, 'dispatch' );
const fetchSuccessSpy = spyOn( spies, 'fetchSuccess' );

test( 'fetchRecipe action', t => {
  const _oldFetch = global.fetch;
  const _oldWindow = global.window;
  global.fetch = spies.fetchSuccess;

  let actual, expected, thunkFn, id, result;
  t.plan( 9 );

  thunkFn = fetchRecipe();
  expected = 'function';
  actual = typeof thunkFn;
  t.equal( actual, expected, 'should return a function' );

  getStateSpy.reset();
  dispatchSpy.reset();

  id = testRecipe.id;
  thunkFn = fetchRecipe( id );
  result = thunkFn( spies.dispatch, spies.getState );
  expected = 0;
  actual = dispatchSpy.calls.length;
  t.equal( actual, expected, 'should not dispatch when there recipe already exists' );

  expected = 1;
  actual = getStateSpy.calls.length;
  t.equal( actual, expected, 'should get the current state' );

  expected = null;
  actual = result;
  t.equal( actual, expected, 'should return null when the recipe already exists' );

  getStateSpy.reset();
  dispatchSpy.reset();
  fetchSuccessSpy.reset();
  global.window = {};

  id = 'new-id';
  thunkFn = fetchRecipe( id );
  result = thunkFn( spies.dispatch, spies.getState );

  expected = 1;
  actual = dispatchSpy.calls.length;
  t.equal( actual, expected, 'should dispatch FETCH_RECIPE_START for a new recipe' );

  expected = 'FETCH_RECIPE_START';
  actual = dispatchSpy.calls[0].args[0].type;
  t.equal( actual, expected, 'should dispatch FETCH_RECIPE_START for a new recipe' );

  expected = 'function';
  actual = typeof result.then;
  t.equal( actual, expected, 'should return a promise for a new recipe' );

  global.fetch = spies.fetchSuccess;
  expected = 1;
  actual = fetchSuccessSpy.calls.length;
  t.equal( actual, expected, 'should call fetch' );

  expected = `http://localhost:3000/recipes/${id}`;
  actual = fetchSuccessSpy.calls[0].args[0];
  t.equal( actual, expected, 'should fetch the recipe list' );

  // TODO: test that dispatch is called when the promise returns successfully and unsuccessfully
  // TODO: test that our local API is called when running on the server

  global.fetch = _oldFetch;
  global.window = _oldWindow;
});

