module.exports = {
    mode: 'production',
    entry: {
        app: '/src/app.js'
    },
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            // CSS 파일 로더 설정
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};