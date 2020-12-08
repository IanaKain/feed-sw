const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '8888';


const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    pathinfo: true,
  },
  devServer: {
    overlay: true,
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    compress: true,
    stats: 'errors-only',
    progress: true,
    noInfo: false,
    disableHostCheck: true,
    port: PORT,
    host: HOST,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new OptimizeCSSAssetsPlugin()],
  },
};

module.exports = merge(baseConfig, devConfig);
