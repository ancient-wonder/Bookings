const Dotenv = require('dotenv-webpack');

const common = {
  context: `${__dirname}/client`,
  plugins: [
    new Dotenv(),
  ],
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
