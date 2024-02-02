const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    open: true,
    host: 'localhost',
    static: [
      {
        directory: path.resolve(__dirname, 'src', 'assets', 'img', 'favicons'),
        publicPath: '/favicons',
      },
      {
        directory: path.resolve(__dirname, 'src', 'assets', 'root'),
        publicPath: '/',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets', 'img', 'favicons'),
          to: path.resolve(__dirname, 'dist', 'favicons'),
        },
        {
          from: path.resolve(
            __dirname,
            'src',
            'assets',
            'root',
            'site.webmanifest'
          ),
          to: path.resolve(__dirname, 'dist', 'site.webmanifest'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: path.resolve(__dirname, 'src', 'assets', 'root', 'favicon.ico'),
    }),
    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|mp3)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
  } else {
    config.mode = 'development';
  }

  return config;
};
