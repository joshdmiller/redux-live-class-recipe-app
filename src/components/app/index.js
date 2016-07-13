import React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import Greeting from '../greeting';
import store from '../../store';

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
          <Greeting />
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}

