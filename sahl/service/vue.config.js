module.exports = {
    transpileDependencies: [
        'vuetify'
    ],
    devServer: {
        //overlay: false
        disableHostCheck: true
    },
    outputDir: 'dist',
    configureWebpack: {
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        }
    }

}