const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");

let html_plugins = [];
const create_html_plugins = (name) => {
  html_plugins.push(
    new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./src/pages/${name}.html`,
      chunks: [name],
      inject: "body",
    })
  );
};
const create_entries = (name) => {
  let entry_array = [];
  entry_array.push(`./src/script/${name}.js`);
  entry_array.push(`./src/style/${name}.css`);

  create_html_plugins(name);
  return entry_array;
};
create_html_plugins("contact_us");
create_html_plugins("error");
module.exports = (env, options) => {
  const isDev = options.mode == "development";
  // const isDevServer = process.env.WEBPACK_DEV_SERVER;
  return {
    entry: {
      index: create_entries("index"),
      add_book_form: create_entries("add_book_form"),
      book: create_entries("book"),
      log_in_form: create_entries("log_in_form"),
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
      assetModuleFilename: "img/[name][ext][query]",
      clean: true,
      filename: "script/[name].js",
      // chunkFilename: (pathData) => {
      //   console.log(pathData);
      //   return pathData.chunk.name === "index"
      //     ? "[name].js"
      //     : "[name]/[name].js";
      // },
    },

    // watch: () => {
    //   if (isDevServer) return false;
    //   return true;
    // },
    // watch: true,
    // watchOptions: {
    //   aggregateTimeout: 200,
    //   poll: 1000,
    // },
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, "dist"),
      watchContentBase: true,
      port: 1996,
      open: true,
      writeToDisk: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              // options: {
              //   // you can specify a publicPath here
              //   // by default it uses publicPath in webpackOptions.output
              //   publicPath: "../",
              // },
            },
            "css-loader",
          ],
        },
        {
          test: /\.svg$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "./style/[name].css",
      }),
    ].concat(html_plugins),
  };
};
