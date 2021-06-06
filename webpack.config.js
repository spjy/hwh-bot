const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/index.ts'],
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'build')
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
