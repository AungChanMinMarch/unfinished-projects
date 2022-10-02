const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = (env, options) => {
	console.log(env);
	console.log(options);
	const is_dev_mode = options.mode === "development";
	return {
		entry: "./src/index.js",
		module: {
			rules: [
				{
					test: /\.svg$/,
					type: "asset/resource",
				},
				// {
				// 	test: /\.html$/,
				// 	use: ["html-loader"],
				// },
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
			],
		},
		output: {
			path: path.resolve(__dirname, "dist/"),
			clean: {
				keep: "index.xml",
			},
			assetModuleFilename: (isDev) => {
				if (is_dev_mode) return "img/[name][ext][query]";
				return "img/[hash][ext][query]";
			},
		},
		devServer: {
			// writeToDisk: true,
			// watchContentBase: true,
			port: 2,
			open: true,
			liveReload: true,
		},
		plugins: [
			new htmlWebpackPlugin({
				template: "./src/app.html",
			}),
			new MiniCssExtractPlugin({
				filename: "./app.css",
			}),
		],
	};
};
