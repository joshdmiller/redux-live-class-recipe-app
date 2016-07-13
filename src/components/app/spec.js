import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import App from './';
import Greeting from '../greeting';

test( 'App', t => {
  let expected, actual;
  t.plan( 3 );

  const wrapper = shallow( <App /> );
  expected = true;
  actual = wrapper.is( Provider );

  t.ok( actual === expected, 'renders a React/Redux Provider' );

  expected = 1;
  actual = wrapper.find( Greeting ).length;

  t.equals( actual, expected, 'renders a Greeting component' );

  expected = 1;
  actual = wrapper.find( AppBar ).length;

  t.equals( actual, expected, 'renders the AppBar' );
});

