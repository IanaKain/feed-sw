const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, 'src/index.jsx')],
  resolve: {
    extensions: ['*', 'json', '.js', '.jsx'],
    alias: {$app: path.resolve(__dirname, 'src')},
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: 'babel-loader',
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)/,
        use: 'url-loader?name=fonts/[name].[ext]',
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader',
      },
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          }
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: './index.html',
      minify: {
        collapseWhitespace: true,
      },
      inject: 'body',
    }),
    // new CopyWebpackPlugin([{from: './src/', to: './', globOptions: {ignore: ['*.jsx', '*.js']}}]),
  ],
};
