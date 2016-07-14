import React from 'react';
import test from 'tape';

import reducer from './recipes';
import createRecipe from '../actions/create-recipe';

test( 'recipes reducer: ADD_RECIPE', t => {
  let expected, actual;
  t.plan( 5 );

  const initialState = [ { id: 1 }, { id: 2, }, { id: 3 } ];
  const name = 'New Recipe';
  const description = 'An interesting food.';
  const newState = reducer( initialState, createRecipe( name, description ) );

  t.ok( newState !== initialState, 'should return a new state' );
  t.ok( Array.isArray( newState ), 'should return an array' );

  expected = initialState.length + 1;
  actual = newState.length;
  t.equal( actual, expected, 'should add the recipe to the array' );

  const newRecipe = newState[ newState.length - 1 ];

  expected = name;
  actual = newRecipe.name;
  t.deepEqual( actual, expected, 'should store the provided name' )

  expected = description;
  actual = newRecipe.description;
  t.deepEqual( actual, expected, 'should store the provided description' )
});


