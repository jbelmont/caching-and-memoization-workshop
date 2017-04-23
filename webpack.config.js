const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './static/js/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './static/build')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin({
      output: {
        path: path.resolve(__dirname, './static/build')
      },
      preview: true
    }),
    new ExtractTextPlugin('caching-and-memoization.css'),
    new webpack.LoaderOptionsPlugin({
      options: {
        minimize: true,
        postcss: [autoprefixer]
      }
    })
  ]
};
