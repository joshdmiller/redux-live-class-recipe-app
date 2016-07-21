import React from 'react';
import test from 'tape';

import reducer from './recipes';
import { addRecipe } from '../actions/create-recipe';

test( 'recipes reducer', t => {
  let expected, actual;
  t.plan( 6 );

  const initialState = [ { id: 1 }, { id: 2, }, { id: 3 } ];
  const name = 'New Recipe';
  const description = 'An interesting food.';
  const newState = reducer( initialState, addRecipe({ name, description }) );

  t.ok( newState !== initialState, 'should return a new state' );
  t.ok( Array.isArray( newState ), 'should return an array' );

  expected = initialState.length + 1;
  actual = newState.length;
  t.equal( actual, expected, 'ADD_RECIPE should add the recipe to the array' );

  const newRecipe = newState[ newState.length - 1 ];

  expected = name;
  actual = newRecipe.name;
  t.deepEqual( actual, expected, 'ADD_RECIPE should store the provided name' )

  expected = description;
  actual = newRecipe.description;
  t.deepEqual( actual, expected, 'ADD_RECIPE should store the provided description' )

  expected = [ ...initialState ];
  actual = reducer( initialState, { type: 'LOAD_RECIPES', recipes: expected });
  t.deepEqual( actual, expected, 'LOAD_RECIPES should replace the recipes' );
});


