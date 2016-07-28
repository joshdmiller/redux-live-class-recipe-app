import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

ReactDOM.render(
  <App />,
  document.getElementById( 'app' )
);

/* istanbul ignore next */
if ( module.hot ) {
  module.hot.accept( './components/app', () => {
    require( './components/app' );
    ReactDOM.render(
      <App />,
      document.getElementById( 'app' )
    );
  });
}

