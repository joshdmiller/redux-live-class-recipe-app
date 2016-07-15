import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import Ingredient from './';

test( 'Ingredient', t => {
  let expected, actual;
  t.plan( 1 );

  const ingredient = {
    qty: 10,
    name: 'habanero chiles',
  };

  const wrapper = shallow( <Ingredient {...ingredient} /> );

  expected = true;
  actual = wrapper.is( 'span' );

  t.ok( actual === expected, 'renders a span' );
});

// TODO(jdm): add test cases for the optional nodes

