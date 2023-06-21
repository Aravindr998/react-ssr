const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const nodeExternals = require('webpack-node-externals')

const browserConfig = {
  entry: "./src/index.js",
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media[name].[ext]",
          publicPath: (url) => url.replace(/public/, ""),
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [autoprefixer()]
                }
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["react-app"] },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "public/css/[name].css",
    }),
  ],
};

const serverConfig = {
  entry: "./server/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media[name].[ext]",
          publicPath: (url) => url.replace(/public/, ""),
          emit: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["react-app"] },
      },
    ],
  },
};

module.exports = [browserConfig, serverConfig];
