import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router';

const Main = ({ children }, { router }) => (
  <div>
    <AppBar
      title="Alfred"
      onTitleTouchTap={() => router.push({ pathname: '/' })}
    />
    { children }
  </div>
);

Main.contextTypes = {
  router: React.PropTypes.object,
};

export default Main;
