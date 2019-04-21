const nodeExternals = require('webpack-node-externals');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const browserConfig = {
    entry: './src/browser/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'public/media/[name].[ext]',
                            publicPath: url => url.replace('public', ''),
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                ],

            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "[id].css"
        }),
    ]
};

const serverConfig = {
    entry: './src/server/index.js',
    target: 'node',
    output: {
        path: __dirname,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    devtool: 'cheap-module-source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'public/media/[name].[ext]',
                            publicPath: url => url.replace('public', ''),
                            emit: false,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: 'css-loader/locals',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};

module.exports = [browserConfig, serverConfig];