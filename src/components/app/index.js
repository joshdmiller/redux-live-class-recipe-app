import React from 'react';
import { Provider } from 'react-redux';

import Greeting from '../greeting';
import store from '../../store';

export default () => {
  return (
    <Provider store={store}>
      <Greeting />
    </Provider>
  );
}

