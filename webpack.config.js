const path = require('path');
const nodeExternals = require('webpack-node-externals');
require('babel-polyfill');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build')
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
