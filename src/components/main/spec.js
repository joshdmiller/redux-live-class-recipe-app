import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import Main from './';
import RecipeList from '../recipe-list';

test( 'Main', t => {
  let expected, actual;
  t.plan( 3 );

  const wrapper = shallow( <Main><p className="test" /></Main> );
  expected = true;
  actual = wrapper.is( 'div' );

  t.ok( actual === expected, 'renders a div' );

  expected = 1;
  actual = wrapper.find( 'p.test' ).length;

  t.equals( actual, expected, 'renders the children passed in' );

  expected = 1;
  actual = wrapper.find( AppBar ).length;

  t.equals( actual, expected, 'renders the AppBar' );
});

