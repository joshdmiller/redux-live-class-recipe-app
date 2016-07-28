import { Server } from 'http';
import express from 'express';
import shortid from 'shortid';
import bodyParser from 'body-parser';
import cors from 'cors';
import socketio from 'socket.io';

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

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Alfred Recipe App</title>
      </head>
      <body>
        <div id="app"></div>
        <script src="${host}/static/bundle.js"></script>
      </body>
    </html>
  `;

  res.status( 200 ).send( html );
});

http.listen( 3000, () => console.log( 'API listening on port 3000' ) );

