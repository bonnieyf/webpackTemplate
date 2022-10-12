const path = require("path");
const devMode = process.env.NODE_ENV !== 'production';
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: './js/[name].[hash:4].js',
    clean: true,
    assetModuleFilename: 'images/[name][ext]'
  },
  devtool:'source-map',
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true,
    compress: true,
    hot: false,
  },
  target: "web",
  module: {
    rules: [
        {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      }
    ],
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
        loader: false,
      }),
    ],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: './src/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[hash:3].css',
    }),
    new DashboardPlugin()
  ],
};