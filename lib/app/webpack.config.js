const path = require('path');

const config = require('./config.js');

const BUILD_DIR = path.resolve(__dirname, 'public/javascripts');
const REACT_DIR = path.resolve(__dirname, 'views');

module.exports = {
  mode: 'development', // 'development' or 'production'
  devtool: 'inline-source-map ', // Comment out this line when releasing in production mode.
  entry: REACT_DIR + '/Root.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'build.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: REACT_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                [
                  '@babel/plugin-proposal-class-properties',
                  {
                    'loose': true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: '../'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '10000',
              name: '[path][name].[ext]',
              outputPath: '../'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  serve: {
    port: config.app.port,
    content: BUILD_DIR
  }
}