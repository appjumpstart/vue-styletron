const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './demo/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: isProduction ? '/vue-styletron' : '/',
    filename: 'js/[name].bundle.min.js',
    chunkFilename: 'js/[id].[chunkhash].min.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new VueLoaderPlugin(),
    ...(isProduction ? [
      new CleanWebpackPlugin(['dist'])
    ] : [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]),
    new HtmlWebpackPlugin({ template: 'demo/index.html' })
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  }
}
