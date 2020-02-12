const path = require('path');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common');
const resolve = require('./webpack.common.resolve');

const dist = '../../micro-portal/dist';
const appName = 'app'

const config = webpackMerge(webpackCommon, {
  mode: 'production',
  devtool: false,
  entry: {
    [appName]: [
      './source/webcomponents/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, dist),
    publicPath: dist,
    filename: `${appName}.bundle.js`,
    chunkFilename: `${appName}.[name].js`,
    libraryTarget: 'umd',
    library: {
      root: "app",
      amd: "app",
      commonjs: "app"
    },
    jsonpFunction: 'webpackJsonpportal'
  },

  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          minChunks: 1,
          chunks: chunk => chunk.name !== 'styles',
        },
        default: false
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            collapse_vars: true,
            reduce_vars: true,
            drop_console: true
          }
        }
      })
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
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
    new webpack.optimize.AggressiveMergingPlugin(),
    Plugin
  ],
  resolve
})


module.exports = config;
