const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

const extractSass = new ExtractTextPlugin({
    filename: "caching-and-memoization.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: './static/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/dist')
  },
  devtool: "source-map",
  module: {
      rules: [{
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader", options: {
                  sourceMap: true
              }
          }, {
              loader: "sass-loader", options: {
                  sourceMap: true,
                  includePaths: ["./static/scss"]
              }
          }]
      }]
  },
  plugins: [
      extractSass
  ]
};
