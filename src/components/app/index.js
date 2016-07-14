import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import RecipeList from '../recipe-list';
import store from '../../store';
import data from '../../static-data';

// dirty hack because material-ui requires a custom event type
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Alfred"
          />
          <RecipeList recipes={data.recipes} />
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}

