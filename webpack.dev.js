const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 5500 // default 8080
        watchFiles: ['./src/main.js'],
        open: true
    },
});
