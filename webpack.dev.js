const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.[contentHash].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.ico',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['vendor', 'app', 'main'],
    }),
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.ico',
      template: './src/competitions.html',
      filename: 'competitions.html',
      chunks: ['vendor', 'app', 'competitions'],
    }),
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.ico',
      template: './src/teams.html',
      filename: 'teams.html',
      chunks: ['vendor', 'app', 'teams'],
    }),
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.ico',
      template: './src/standings.html',
      filename: 'standings.html',
      chunks: ['vendor', 'app', 'standings'],
    }),
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.ico',
      template: './src/team.html',
      filename: 'team.html',
      chunks: ['vendor', 'app', 'team'],
    }),
    new HtmlWebpackPlugin({
      favicon: './src/assets/icon/favicon.ico',
      template: './src/favorite-teams.html',
      filename: 'favorite-teams.html',
      chunks: ['vendor', 'app', 'favoriteTeams'],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: './src/sw.js',
    }),
    new WebpackPwaManifest({
      name: 'WikiFootball',
      short_name: 'WikiFootball',
      description: 'All about footbal',
      theme_color: '#0288d1',
      gcm_sender_id: '233511798113',
      background_color: '#FFFFFF',
      icons: [
        {
          src: path.resolve('src/assets/icon/icon.png'),
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
        },
      ],
    }),
  ],
});
