/**
 * Created by Mello on 13.07.2017.
 */

let webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/build/',
        publicPath: 'build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
           //     exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /node_modules\/dist\/bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?mimetype=image/png" }
        ]
    },
    watch: true
};