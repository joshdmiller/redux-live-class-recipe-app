var path = require( 'path' );
var webpack = require( 'webpack' );

var env = process.env.NODE_ENV || 'production';
var dev = [ 'development', 'testing' ].indexOf( env.toLowerCase() ) !== -1 ? true : false;

module.exports = {
  devtool: dev ? 'inline-source-map' : 'eval',

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8888',
    'webpack/hot/only-dev-server',
    './src/client/index',
  ],

  output: {
    path: path.join( __dirname, 'dist' ),
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        include: path.join( __dirname, 'src' ),
      },
    ],
  }
};

