import { Server } from 'http';
import express from 'express';
import shortid from 'shortid';
import bodyParser from 'body-parser';
import cors from 'cors';
import socketio from 'socket.io';

import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';

import routes from '../routes';
import createStore from '../store';
import data from '../static-data';

const reply = ( status, message ) => ({ status, message });

// https://gist.github.com/mathewbyrne/1280286
const sluggify = text => text.toString().toLowerCase()
  .replace( /\s+/g, '-' )      // Replace spaces with -
  .replace( /[^\w\-]+/g, '' )  // Remove all non-word chars
  .replace( /\-\-+/g, '-' )    // Replace multiple - with single -
  .replace( /^-+/, '' )        // Trim - from start of text
  .replace( /-+$/, '' )        // Trim - from end of text
  ;

const app = express();
const http = Server( app );
const io = socketio( http );

app.use( cors() );
app.use( bodyParser.json() );

/**
 * Get a list of recipe resources
 */
app.get( '/recipes', ( req, res ) => {
  res.status( 200 ).json( data.recipes );
});

/**
 * Create a new recipe
 */
app.post( '/recipes', ( { body }, res ) => {
  const recipe = {
    ...body,
    id: shortid.generate(),
    slug: sluggify( body.name ),
  };

  data.recipes.push( recipe );

  io.emit( 'NEW_RECIPE', recipe );

  res.status( 200 ).json( recipe );
});

/**
 * Get a particular recipe resource by id
 */
app.get( '/recipes/:recipe_id', ( { params: { recipe_id } }, res ) => {
  const recipe = data.recipes.find( r => r.id === recipe_id );

  if ( ! recipe ) {
    res.status( 404 ).json( reply( 404, 'Not Found' ) );
  } else {
    res.status( 200 ).json( recipe );
  }
});

/**
 * Update a particular recipe resource by id
 */
app.put( '/recipes/:recipe_id', ( { params: { recipe_id }, body }, res ) => {
  let recipe = data.recipes.find( r => r.id === recipe_id );

  if ( ! recipe ) {
    return res.status( 404 ).json( reply( 404, 'Not Found' ) );
  }

  recipe = {
    ...recipe,
    ...body,
    id: recipe.id,
    slug: recipe.slug,
  };

  res.status( 200 ).json( recipe );

  // TODO: emit a change notification on the websocket
});

/**
 * Delete a particular recipe resource by id
 */
app.delete( '/recipes/:recipe_id', ( { params: { recipe_id } }, res ) => {
  const recipe = data.recipes.find( r => r.id === recipe_id );

  if ( ! recipe ) {
    return res.status( 404 ).json( reply( 404, 'Not Found' ) );
  }

  data.recipes = data.recipes.filter( r => r !== recipe );

  res.status( 200 ).json( reply( 200, 'Recipe deleted' ) );

  // TODO: emit a change notification on the websocket
});

app.use( ( req, res ) => {
  // for development, we serve from the webpack dev server
  const host = '//localhost:8888';
  const location = createLocation( req.url );

  match({ routes, location }, ( err, redirectLocation, renderProps ) => {
    if ( err ) {
      return res.status( 500 ).send( err.message );
    } else if ( redirectLocation ) {
      return res.redirect( 302, redirectLocation.pathname + redirectLocation.search );
    } else if ( ! renderProps ) {
      return res.status( 404 ).send( 'Not found' );
    }

    const store = createStore();

    let promises = renderProps.components
      .filter( c => c )
      .map( c => c.WrappedComponent ? c.WrappedComponent : c )
      .filter( c => c.fetch )
      .map( component => component.fetch( ( ...a ) => store.dispatch( ...a ), renderProps.params ) )
      ;

    Promise.all( promises )
      .then( () => {
        const initialState = JSON.stringify( store.getState() );

        // Note: Material-UI uses inline styles and adds vendor prefixing based on the user agent. If we
        // do not do this little dirty hack to let it know what user agent we are expected, the inline
        // styles sent to the client will not match the ones the browser generates, the DOM won't match,
        // and react will have to re-render to the DOM, losing one of the key benefits of isomorophic
        // apps. So for each request, we fake the user agent in node with the one from the client
        // request.
        global.navigator = { userAgent: req.headers[ 'user-agent' ] };

        const innerHTML = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1">

              <title>Alfred Recipe App</title>

              <script type="text/javascript">
                window.__INITIAL_STATE__ = ${initialState};
              </script>
            </head>
            <body>
              <div id="app">${innerHTML}</div>
              <script src="${host}/static/bundle.js"></script>
            </body>
          </html>
        `;

        res.status( 200 ).send( html );
      })

      // Normally, you'd handle this error in a way that makes sense in your app.
      .catch( e => res.status( 500 ).send( e.stack ) )
      ;
  });
});

http.listen( 3000, () => console.log( 'API listening on port 3000' ) );

