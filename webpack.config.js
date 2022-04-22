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
    ,
    devServer: {
        historyApiFallback: true, //매핑되지 않은 개발 서버에 대한 요청시 /index.html로 라우팅
    }
};