import React from 'react';
import AppBar from 'material-ui/AppBar';

export default ({ children }) => (
  <div>
    <AppBar
      title="Alfred"
    />
    { children }
  </div>
);
