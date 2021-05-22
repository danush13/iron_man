const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'main.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true,
        proxy: { '/api/**': { target: 'http://localhost:8080', secure: false } },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [htmlPlugin],
    devtool: 'inline-source-map',
};
