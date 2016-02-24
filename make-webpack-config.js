var path = require("path");
var webpack = require("webpack");

module.exports = function(options){
    return {
        entry: "./app/runApp",
        output: {
            path: path.join(__dirname, 'build'),
            publicPath: "http://localhost:2992/_assets/",
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
                { test: /\.jsx?$/,
                  exclude: /(node_modules|bower_components)/,
                  loader: "babel-loader?stage=0"
                }]
        },
        devServer: {
            // stats: {
            //   cached: false,
            //   exclude: excludeFromStats
            // }
        },
        devtool: "eval",
        debug: true,
        resolve: {
            root: path.join(__dirname, "app"),
            modulesDirectories: ["web_modules", "node_modules"],
            extensions: ["", ".web.js", ".js", ".jsx"]
        }
    }
}
