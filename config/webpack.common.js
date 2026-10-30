const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const htmlPages = require('./webpack.pages.js')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/javascripts/index.js',
    about: './src/javascripts/about.js',
    placeholder: './src/javascripts/placeholder.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve('.', 'docs'),
    publicPath: './',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: { sources: false }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin(), ...htmlPages],
  optimization: {
    minimizer: [new CssMinimizerPlugin({ minimizerOptions: { preset: ['default', { calc: false }] } })]
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify')
    }
  }
}
