var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = process.env.NODE_ENV || 'development';

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    html: './index.html',
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        loader: env === 'production' ?
                    ExtractTextPlugin.extract('style-loader',
                      'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                    ) :
                    'style-loader!' +
                      'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
                      'postcss-loader'
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: 'style!css'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    require("postcss-import")(),
    require("postcss-cssnext")(),
    require('postcss-nested')(),
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new ExtractTextPlugin('styles.css')
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
}
