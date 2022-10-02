// prettier-ignoreconst path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = (env, options) => {
  const isDev = options.mode == "development";
  return {
    entry: {
      index: "./src/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      assetModuleFilename: "img/[name][ext][query]",
    },
    // watch: true,
    // watchOptions: {
    //   aggregateTimeout: 200,
    //   poll: 1000,
    // },
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, "dist"),
      watchContentBase: true,
      port: 2,
      open: true,
      writeToDisk: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.svg$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        chunks: ["index"],
        inject: "body",
      }),
      new MiniCssExtractPlugin({
        filename: "./style.css",
      }),
    ],
  };
};
