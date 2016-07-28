import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from '../../routes';
import createStore from '../../store';

const store = createStore();
const history = syncHistoryWithStore( global.window ? browserHistory : createMemoryHistory(), store );

export default () => {
  return (
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>
  );
}

