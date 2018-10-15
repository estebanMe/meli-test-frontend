var webpack = require('webpack');
var path = require('path');
var htmlPlugin = require('html-webpack-plugin');

var SRC = path.resolve(__dirname, 'src');
var OUT = path.resolve(__dirname, 'dist');

var html = new htmlPlugin({
    hash: true,
    template: 'src/client/index.html',
    favicon: 'src/client/favicon.ico'
});

var config = {
    entry: SRC + '/client/index.js',
    output: {
        path: OUT,
        filename: 'app/bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            { test: /\.js?/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.scss?/, exclude: /node_modules/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|svg)$/, use: [{ loader: 'file-loader', options: { name: 'assets/[name]-[hash].[ext]' } }] }
        ]
    },
    plugins: [
        html
    ]
};

module.exports = config;