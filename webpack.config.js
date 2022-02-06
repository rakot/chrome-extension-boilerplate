const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WebExtension = require('webpack-target-webextension');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtReloader = require('webpack-ext-reloader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


let __IS_DEV__ = false;

function modifyManifest(buffer) {
    // copy-webpack-plugin passes a buffer
    let manifest = JSON.parse(buffer.toString());

    if(__IS_DEV__) {
        manifest.content_security_policy = "script-src 'self' 'unsafe-eval'; object-src 'self'";
    }

    // pretty print to JSON with two spaces
    return  JSON.stringify(manifest, null, 2);
}

module.exports = (env, argv) => {
    if(argv.mode === 'development') {
        __IS_DEV__ = true;
    }

    const jsLoaders = () => {
        return [{
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties'
                ]
            }
        }]
    }


    const config = {
        context: path.resolve(__dirname,'source'),
        mode: 'development',
        entry: {
            'bg/background': './bg/background.js',
            'popup/js/popup': './popup/js/popup.js',
            'inject/inject': './inject/inject.js',
        },
        output: {
            chunkFilename: './assets/[name].bundle.js',
            filename: '[name].js',
            clean: true,
            environment: { dynamicImport: true },
            path: path.resolve(__dirname, 'build'),
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'source/inject/'),
                    exclude: [/node_modules/, path.resolve(__dirname, 'source/popup/')],
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'source/popup/'),
                    exclude: [/node_modules/, path.resolve(__dirname, 'source/inject/')],
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: jsLoaders()
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser',
            }),
            new CopyPlugin({
                patterns: [
                    {from: 'icons', to: 'icons', priority: 50},
                    {from: 'popup/index.html', to: 'popup/index.html', priority: 50},
                    {from: 'popup/css', to: 'popup/css', priority: 50},
                    {from: 'manifest.json', to: 'manifest.json', transform (content, path) {
                            return modifyManifest(content)
                        }, priority: 50}
                ]
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify((__IS_DEV__) ? 'development' : 'production')
            }),
            new WebExtension({background: { entry: 'background', manifest: 2 }}),
            new CleanWebpackPlugin(),
        ]
    };

    if(__IS_DEV__)
    {
        config.devtool = 'source-map';
        config.plugins.push(new ExtReloader({
            port: 9090, // Which port use to create the server
            reloadPage: true, // Force the reload of the page also
            manifest: path.resolve(__dirname, "./source/manifest.json")
        }));
    }

    return config;
}