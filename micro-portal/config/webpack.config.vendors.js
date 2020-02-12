const path = require('path');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common');

const dist = '../dist';

const config = webpackMerge(webpackCommon, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-promise',
      'redux-thunk'
    ]
  },
  output: {
    path: path.resolve(__dirname, `${dist}/dll`),
    filename: `[name].dll.js`,
    library: '[name]_dll'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/index.html'),
        to: path.resolve(__dirname, `${dist}/index.html`),
      }
    ]),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '..'),
      name: '[name]_dll',
      path: path.resolve(__dirname, `${dist}/dll`, 'vendors.manifest.json')
    })
  ]
})


module.exports = config;
