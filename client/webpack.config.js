const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const distPath = path.relative(process.cwd(), path.resolve(__dirname, 'dist'));

module.exports = {
  entry: './app.jsx',
  output: {
    filename: `${distPath}/app.js`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  context: __dirname,
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'index.html',
        to: `${distPath}/index.html`,
      },
      {
        from: 'fluxfail.css',
        to: `${distPath}/fluxfail.css`,
      },
      {
        from: 'robots.txt',
        to: `${distPath}/robots.txt`,
      },
      {
        from: 'assets/Icon.svg',
        to: `${distPath}/img/Icon.svg`,
      },
      {
        from: 'assets/Logo.svg',
        to: `${distPath}/img/Logo.svg`,
      },
      {
        from: 'assets/Icon_32x32.png',
        to: `${distPath}/favicon.png`,
      },
      {
        from: 'assets/fonts',
        to: `${distPath}/fonts`,
      },
    ]),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL || 'http://100.115.92.2:8080'),
    }),
  ],
};
