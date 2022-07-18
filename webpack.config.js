const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const ExtReloader = require('webpack-ext-reloader-mv3');


const isDevelopment = (argv) => {
    return argv.mode === 'development';
};

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

const getBasicConfig = (version, development = false) => {
    return {
        context: path.resolve(__dirname,'source'),
        mode: (development) ? 'development' : 'production',
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        entry: {
            'bg/background': './bg/background.ts',
            'popup/js/popup': './popup/js/popup.tsx',
            'inject/inject': './inject/inject.tsx',
        },
        devtool: development ? 'inline-source-map' : 'source-map',
        output: {
            chunkFilename: './assets/[name].bundle.js',
            filename: '[name].js',
            clean: true,
            environment: { dynamicImport: true },
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
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: jsLoaders()
                },
            ]
        },
        plugins: [
            new NodePolyfillPlugin(),
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
                    {from: 'manifest-v'+version+'.json', to: 'manifest.json', priority: 50}
                ]
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify((development) ? 'development' : 'production')
            }),
            new CleanWebpackPlugin(),
        ]
    };
}


const chrome_config =  (env, argv) => {
    let development = isDevelopment(argv);

    const config = getBasicConfig(3, development);
    config.output.path = path.resolve(__dirname, 'chrome');

    if(development) {
        config.plugins.push(new ExtReloader({
            entries: {
                contentScript: 'inject/inject',
                background: 'bg/background',
                extensionPage: 'popup/js/popup',
            }
        }),);
    }

    return config;
}

const firefox_config =  (env, argv) => {
    let development = isDevelopment(argv);

    const config = getBasicConfig(2, development);
    config.output.path = path.resolve(__dirname, 'firefox');

    return config;
}



module.exports = [chrome_config, firefox_config];