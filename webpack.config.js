const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtReloader = require('webpack-ext-reloader-mv3');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDevelopment = (argv) => {
    return argv.mode === 'development';
};

const hotReload = true;

function modifyManifest (buffer, version, development) {
    // copy-webpack-plugin passes a buffer
    const manifest = JSON.parse(buffer.toString());

    if (development) {
        manifest.permissions.push('alerts');
    }

    if (version === 2) {
        manifest.manifest_version = 2;
        manifest.host_permissions.forEach((host) => {
            manifest.permissions.push(host);
        });
        delete manifest.host_permissions;
        manifest.background.scripts = [manifest.background.service_worker];
        manifest.background.persistent = true;
        delete manifest.background.service_worker;

        manifest.browser_action = manifest.action;
        delete manifest.action;

        const webAccessibleResources = [];
        manifest.web_accessible_resources.forEach((stack) => {
            stack.resources.forEach((res) => {
                webAccessibleResources.push(res);
            });
        });
        manifest.web_accessible_resources = webAccessibleResources;
    }

    // pretty print to JSON with two spaces
    return JSON.stringify(manifest, null, 2);
}

const getBasicConfig = (version, development = false) => {
    return {
        context: path.resolve(__dirname, 'source'),
        mode: (development) ? 'development' : 'production',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        entry: {
            'assets/extension': './assets/extension.css',
            'bg/background': './bg/background.ts',
            'popup/popup': './popup/js/popup.tsx',
            'inject/inject': './inject/inject.tsx'
        },
        devtool: development ? 'inline-source-map' : 'source-map',
        output: {
            chunkFilename: './assets/[name].bundle.js',
            filename: '[name].js',
            clean: true,
            environment: { dynamicImport: true }
        },
        optimization: {
            usedExports: true,
            minimize: !development,
            minimizer: [
                new CssMinimizerPlugin(), new TerserPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    include: /source/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.tsx?$/,
                    include: /source/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new webpack.optimize.AggressiveMergingPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
                process: 'process/browser'
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'icons', to: 'icons', priority: 50 },
                    { from: 'popup/index.html', to: 'popup/index.html', priority: 50 },
                    {
                        from: 'manifest.json',
                        to: 'manifest.json',
                        transform (content, path) {
                            return modifyManifest(content, version, development);
                        },
                        priority: 50
                    }
                ]
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify((development) ? 'development' : 'production')
                }
            }),
            new CleanWebpackPlugin()
        ]
    };
};

const chromeConfig = (env, argv) => {
    const development = isDevelopment(argv);

    const config = getBasicConfig(3, development);
    config.output.path = path.resolve(__dirname, 'chrome');

    if (development && hotReload) {
        config.plugins.push(new ExtReloader({
            entries: {
                contentScript: 'inject/inject',
                background: 'bg/background',
                extensionPage: 'popup/popup'
            }
        }));
    }

    return config;
};

const firefoxConfig = (env, argv) => {
    const development = isDevelopment(argv);

    const config = getBasicConfig(2, development);
    config.output.path = path.resolve(__dirname, 'firefox');

    return config;
};

module.exports = [chromeConfig, firefoxConfig];
