const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
entry: [
    "webpack-dev-server/client?http://127.0.0.0:8080",
    "webpack/hot/only-dev-server",
    "./src"
  ],
    // entry: './src/index.js',
    devtool: "eval-cheap-source-map",

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    
    resolve : {
        alias: {
            "@app": path.resolve(__dirname, 'src/')
        }

    },
    devServer:{
        host: '192.168.100.76',
        port:2000,
        historyApiFallback: true,
        // proxy: {
        //     '/api': 'http://localhost:3000'
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new Dotenv()
    ],
    module: {
        rules: [
            {
                test: [/\.js$/, /\.jsx?$/],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                }
            },{
                test: /\.css$/i,
                use: ['style-loader','css-loader']
            }
        ]
    }

}