import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';

import Greeting from './';

test( 'Greeting', t => {
  t.plan( 1 );

  const wrapper = shallow( <Greeting /> );
  const expected = true;
  const actual = wrapper.is( 'div' );

  t.ok( actual === expected, 'renders a div' );
});

