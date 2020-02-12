const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const webpackCommon = require('./webpack.common');
const resolve = require('./webpack.common.resolve');

const dist = '/dist/';
const name = 'portal'

const config = webpackMerge(webpackCommon, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './source/index.js'
  ],
  output: {
    path: path.resolve(__dirname, dist),
    publicPath: dist,
    filename: `bundle.js`,
  },

  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: dist,
    compress: true,
    port: 9000,
    hot: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: path.resolve(__dirname, '../dist/dll', 'vendors.manifest.json')
    })
  ],
  resolve
})


module.exports = config;
