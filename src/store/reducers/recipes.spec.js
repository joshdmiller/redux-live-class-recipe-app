import React from 'react';
import test from 'tape';
import { List, fromJS, is } from 'immutable';

import reducer from './recipes';
import { addRecipe } from '../actions/create-recipe';

test( 'recipes reducer', t => {
  let expected, actual, newState;
  t.plan( 8 );

  const initialState = fromJS([ { id: '1' }, { id: '2', }, { id: '3' } ]);
  const name = 'New Recipe';
  const description = 'An interesting food.';
  newState = reducer( initialState, addRecipe({ name, description }) );

  t.ok( newState !== initialState, 'should return a new state' );
  t.ok( List.isList( newState ), 'should return a List' );

  expected = initialState.size + 1;
  actual = newState.size;
  t.equal( actual, expected, 'ADD_RECIPE should add the recipe to the array' );

  const newRecipe = newState.last();

  expected = name;
  actual = newRecipe.get( 'name' );
  t.deepEqual( actual, expected, 'ADD_RECIPE should store the provided name' )

  expected = description;
  actual = newRecipe.get( 'description' );
  t.deepEqual( actual, expected, 'ADD_RECIPE should store the provided description' )

  expected = fromJS( initialState.toJS() );
  actual = reducer( initialState, { type: 'LOAD_RECIPES', payload: expected } );
  t.ok( is( actual, expected ), 'LOAD_RECIPES should replace the recipes' );

  newState = reducer( initialState, { type: 'DELETE_RECIPE', id: '1' } );
  expected = initialState.size - 1;
  actual = newState.size;
  t.equal( actual, expected, 'DELETE_RECIPE should remove a recipe from the array' );

  expected = undefined;
  actual = newState.find( r => r.id === '1' );
  t.equal( actual, expected, 'DELETE_RECIPE should remove the specified recipe' );
});


