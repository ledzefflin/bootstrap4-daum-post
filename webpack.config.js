const path = require('path');
const $fp = require('lodash/fp');
const htmlWebpackPlugin = require('html-webpack-plugin');

require('babel-loader');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // loaders
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }]
  },

  // plugins
  plugins: [
    new htmlWebpackPlugin({
      title: 'daum주소 테스트 with bootstrap4',
      template: path.resolve(__dirname, 'src/index.html')
    })
  ],
  watch: true,
  devtool: 'source-map'
}

module.exports = config;