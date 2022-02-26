const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WebExtension = require('webpack-target-webextension');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtReloader = require('webpack-ext-reloader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


let __IS_DEV__ = false;

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
        entry: {
            'bg/background': './bg/background.js',
            'popup/js/popup': './popup/js/popup.js',
            'inject/inject': './inject/inject.js',
        },
        devtool: false,
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

    if(development)
    {
        // config.plugins.push(new WebExtension({background: { entry: 'bg/background', manifest: 3 }}));

        // config.devtool = 'source-map';
        // config.plugins.push(new ExtReloader({
        //     entries: {
        //         background: 'bg/background',
        //     },
        //     port: 9090, // Which port use to create the server
        //     reloadPage: true, // Force the reload of the page also
        //     manifest: path.resolve(__dirname, "./source/manifest-v3.json")
        // }));
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