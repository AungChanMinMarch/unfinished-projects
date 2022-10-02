const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = (env, options) => {
  const name = env.name || "index";
  const isDev = options.mode == "development";
  const isDevServer = env.WEBPACK_SERVE;
  return {
    entry: {
      main: [`./style/${name}.css`, `./script/${name}.js`],
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

    watch: !isDevServer,
    // watchOptions: {
    //   aggregateTimeout: 200,
    //   poll: 1000,
    // },
    devServer: {
      // writeToDisk: true,
      // contentBase: path.resolve(__dirname, "dist"),
      // watchContentBase: true,
      port: 2022,
      open: [`./${name}.html`],
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
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `./tutorial/${name}.html`,
        chunks: "main",
        inject: "body",
      }),
    ],
  };
};
