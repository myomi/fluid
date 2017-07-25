const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/renderer/index.html',
    hash: true
});

const extractSass = new ExtractTextPlugin({
    filename: 'app.css'
});

const serverConfig = {
    target: 'electron-main',
    entry: './src/main/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist', 'main'),
        filename: 'main.js'
    },
    node: {
        __dirname: false
    },
    externals: {
        'sqlite3':'commonjs sqlite3',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'awesome-typescript-loader'
                }
            ]
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    devtool: 'source-map'
};

const clientConfig = {
    target: 'electron-renderer',
    entry: './src/renderer/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist', 'renderer'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'awesome-typescript-loader'
                }
            ]
        }, {
            test: /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            use: {
                loader: 'elm-webpack-loader',
                options: {}
            }
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        html,
        extractSass
    ],
    devtool: 'source-map'
};

module.exports = [serverConfig, clientConfig];