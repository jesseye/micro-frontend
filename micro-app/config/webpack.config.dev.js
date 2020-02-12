const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackCommon = require('./webpack.common');
const resolve = require('./webpack.common.resolve');

const portaldir = '../../micro-portal';
const dist = '../../micro-portal/dist';
const appName='app';

const config = webpackMerge(webpackCommon, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    [appName]: [
      './source/webcomponents/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, dist),
    publicPath: dist,
    filename: `${appName}.bundle.js`,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: 20
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, portaldir),
      manifest: path.resolve(__dirname, `${portaldir}/dist/dll`, 'vendors.manifest.json')
    })
  ],
  resolve: {
    ...resolve,
    modules: [`${portaldir}/node_modules`]
  }
});

module.exports = config;
