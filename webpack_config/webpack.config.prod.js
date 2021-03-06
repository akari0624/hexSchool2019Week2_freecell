'use strict'

const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const WEBPACK_Config_Base = require('./webpack.config.base')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

let __LOADERS_ARR
if (
  process.env.NODE_ENV ===
  WEBPACK_Config_Base.NODE_ENV_Keywords.TRANSPILE_WITH_BABEL
) {
  __LOADERS_ARR =
    WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.TS_THEN_BABEL
} else {
  __LOADERS_ARR =
    WEBPACK_Config_Base.JS_TRANSPILE_LOADER_ARR_OPTIONS.ONLY_TS_LOADER
}

module.exports = {
  entry: WEBPACK_Config_Base.ENTRY_POINT,
  output: {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: '/hexSchool2019Week2_freecell',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },

  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: __LOADERS_ARR,
        exclude: /node_modules/,
      },
      WEBPACK_Config_Base.ENFORCE_SOURCE_MAP_LOADER,
      WEBPACK_Config_Base.CSS_LOADER_CONFIG,
      {
        use: 'url-loader?limit=8192',
        test: /\.(svg)$/,
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg|css|ttf|woff|woff2|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '/hexSchool2019Week2_freecell/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, '../', 'index.html'),
      filename: './index.html',
    }),
    process.env.BUNDLE_ANALYZER &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info',
      }),
  ],
  resolve: WEBPACK_Config_Base.RESOLVE_SETTING_CONFIG,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
}
