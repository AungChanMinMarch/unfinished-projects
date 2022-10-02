"dependencies": 
pnpm add react react-dom

"devDependencies": 
pnpm add -D @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli webpack-dev-server

# to be able to use async and await func
## create .babelrc file in root dir and write
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/transform-runtime"]
    ]
}
## install this two
pnpm add --save @babel/runtime 
pnpm add --save-dev @babel/plugin-transform-runtime