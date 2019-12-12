let webpack = require('webpack');
let htmlWebpackPlugin =require('html-webpack-plugin');
let path = require('path')
module.exports= {
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true, 
        inline: true,
        port: 8080,  // 端口号
        overlay: {
          errors: true // 错误提示
        }
    },
    entry: [ path.resolve(`src/index.tsx`) ],
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve( `dist`),
        // publicPath: './'
    },
    resolve: {
        extensions: ['.js','.tsx','.json']
    },
    module: {
        rules: [
            { 
                test: /\.(tsx|ts)$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/    
            },{
                test: /\.css$/,
                use: ['style-loader','css-loader','postcss-loader']
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'react-test',
            inject: true,
            favicon: path.resolve('favicon.ico') 
        }),   
        // new webpack.DefinePlugin({
        //     'process.env': {
        //       NODE_ENV: JSON.stringify('production')
        // }     
        // new webpack.optimize.UglifyJsPlugin()
    ]
}