var webpack = require( 'webpack' );
var WebpackDevServer = require( 'webpack-dev-server' );
var config = require( './webpack.config' );

new WebpackDevServer( webpack( config ), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen( 8888, '0.0.0.0', function ( err ) {
  if ( err ) {
    return console.log( err );
  }

  console.log( 'Listening at http://localhost:8888/' );
});

