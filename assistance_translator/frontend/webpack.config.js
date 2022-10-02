const path = require('path');
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/index.js',
    
    devtool: "eval-cheap-source-map",

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },

    resolve : {
        alias: {
            "@app": path.resolve(__dirname, 'src/')
        }

    },

    devServer:{
        // host: '192.168.100.76',
        port:2000,
        historyApiFallback: true
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
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