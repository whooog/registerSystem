const { postcss } = require('./src/config/pxtorem')
module.exports = {
    outputDir:process.env.NODE_ENV==="test"?"dist_test":"dist",
    publicPath: './',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    }
}