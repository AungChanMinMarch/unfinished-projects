13 April 
# React Router not working.
## Even thought I added Router, the browser cannot get the path
### Add module.exports.devServer.historyApiFallback = true in webpack.config.js

# webpack gives error after writing some css
### pnpm add -D css-loader
### add { test: /\.css$\i, use: ['css-loader']} in module.exports.module.rules
# CSS still not working
## even though webpack doesn't give error anymore. css style don't work
### pnpm add -D style-loader
### add { test: /\.css$\i, use: ['style-loader','css-loader']} in module.exports.module.rules

# I can't enter my website from my phones