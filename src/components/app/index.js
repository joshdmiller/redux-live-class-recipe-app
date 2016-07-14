import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Main from '../main';
import RecipeList from '../recipe-list';
import store from '../../store';

// dirty hack because material-ui requires a custom event type
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <Router history={hashHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={RecipeList} />
          </Route>
        </Router>
      </MuiThemeProvider>
    </Provider>
  );
}

