// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   entry: './client/index.js',
//   output: {
//     path: path.resolve(__dirname + '/client/', 'dist'),
//     filename: 'index_bundle.js',
//     publicPath: '/'
//   },
//   module: {
//     rules: [
//       { test: /\.(js)$/, use: 'babel-loader' },
//       { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
//     ]
//   },
//   devServer: {
//     historyApiFallback: true,
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'client/index.html'
//     })
//   ]
// };

var path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname + '/client/', 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
};
// const path = require('path');

// const SRC_DIR = path.join(__dirname, '/client');
// const DIST_DIR = path.join(__dirname, '/client/dist');

// module.exports = {
//   entry: `${SRC_DIR}/index.js`,
//   output: {
//     filename: 'bundle.js',
//     path: DIST_DIR,
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?/,
//         include: SRC_DIR,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react'],
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
// };

// const webpack = require('webpack');
// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const BUILD_DIR = path.resolve(__dirname, 'client/dist');
// const APP_DIR = path.resolve(__dirname, 'client/components');

// const config = {
//   entry: APP_DIR + '/index.js',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         include: APP_DIR,
//         use: ['babel-loader'],
//       },
//       {
//         test: /\.(s*)css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: 'style-loader',
//           use: ['css-loader', 'style-loader'],
//           publicPath: BUILD_DIR,
//         }),
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['*', '.js', '.jsx'],
//   },
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js',
//   },
// };

// module.exports = config;