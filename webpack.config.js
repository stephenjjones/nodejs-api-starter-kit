require("babel-polyfill");
var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    root: path.join(__dirname, 'client')
  },
  entry: [
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'static/js'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
  ],
  module: {
    preLoaders: [
      {
      test: /\.js$/,
      loaders: ['eslint'],
      exclude: /node_modules/,
      include: path.join(__dirname)
      }
    ],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: path.join(__dirname)
    }]
  }
}
