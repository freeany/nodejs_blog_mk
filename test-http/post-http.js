const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method.toLowerCase() === 'post') {
        // console.log(req.headers['content-type'])
        let postData = ''

        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            // console.log(postData,'ccc')
            res.end(postData)
        })
    }
})

server.listen(3000, () => {
    console.log('server in listen in 3000...')
})