const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const common = {
  context: `${__dirname}/client`,
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production'),
  //     },
  //   }),
  //   new webpack.optimize.AggressiveMergingPlugin(),
  //   new CompressionPlugin({
  //     asset: '[path].gz[query]',
  //     algorithm: 'gzip',
  //     test: /\.js$|\.css$|\.html$/,
  //     threshold: 10240,
  //     minRatio: 0.8,
  //   }),
  // ],
};


const client = {
  entry: './client.js',
  output: {
    path: `${__dirname}/public`,
    filename: 'app.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: `${__dirname}/public`,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['css-loader'] },
    ],
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];
