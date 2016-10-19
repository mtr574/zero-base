var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./app/scripts.js",
    output: {
        path: __dirname + "/app",
        filename: "scripts.min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),
    ],
};
// Run 'NODE_ENV=production webpack' for production
