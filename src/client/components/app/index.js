import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Main from '../main';
import RecipeList from '../recipe-list';
import Recipe from '../recipe';
import store from '../../../store';

// dirty hack because material-ui requires a custom event type
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore( global.window ? browserHistory : createMemoryHistory(), store );

export default () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={history}>
          <Route path="/" component={Main}>
            <IndexRoute component={RecipeList} />

            <Route path="/recipes">
              <IndexRoute component={RecipeList} />

              <Route path=":id/:slug" component={Recipe} />
            </Route>
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

