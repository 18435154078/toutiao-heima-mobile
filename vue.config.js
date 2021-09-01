module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://api-toutiao-web.itheima.net',
                secure: false,      // 如果是https接口，需要配置这个参数为true
                changeOrigin: true,     // 如果接口跨域，需要进行这个参数配置为true
                pathRewrite: {
                    '^/api': '/'  
                }
            } 
        }
    },
    publicPath: './'
}