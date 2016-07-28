import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { Recipe } from './';

test( 'Recipe', t => {
  let expected, actual;
  t.plan( 3 );

  const recipe = fromJS({
    id: '123',
    name: 'A recipe',
    description: 'This is tasty.',
  });

  const wrapper = shallow( <Recipe recipe={recipe} /> );

  expected = true;
  actual = wrapper.is( 'div' );

  t.ok( actual === expected, 'renders a div' );

  expected = recipe.get( 'name' );
  actual = wrapper.find( 'h1' ).first().text();
  t.equals( actual, expected, 'renders the name in an h1' );

  expected = recipe.get( 'description' );
  actual = wrapper.find( 'p' ).first().text();
  t.equals( actual, expected, 'renders the description in a p' );
});


