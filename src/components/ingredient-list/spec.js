import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import IngredientList from './';
import Ingredient from '../ingredient';

test( 'IngredientList', t => {
  let expected, actual;
  t.plan( 2 );

  const ingredients = fromJS([
    {
      qty: 10,
      name: 'habanero chiles',
    },
    {
      qty: 2,
      name: 'garlic cloves, unpeeled',
    },
    {
      qty: 2,
      unit: 'tablespoons',
      name: 'sour orange juice',
    },
    {
      name: 'salt',
    },
  ]);

  const wrapper = shallow( <IngredientList ingredients={ingredients} /> );

  expected = true;
  actual = wrapper.is( 'div' );

  t.ok( actual === expected, 'renders an div' );

  expected = 4;
  actual = wrapper.find( Ingredient ).length;
  t.equals( actual, expected, 'renders an Ingredient for each provided' );
});

// TODO(jdm): there is probably more you can test here

