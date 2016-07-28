import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';

// dirty hack because material-ui requires a custom event type
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Main = ({ children }, { router }) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title="Alfred"
        onTitleTouchTap={() => router.push({ pathname: '/' })}
      />
      { children }
    </div>
  </MuiThemeProvider>
);

Main.contextTypes = {
  router: React.PropTypes.object,
};

export default Main;
