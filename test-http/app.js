const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method
    const type = req.headers['content-type'] // get请求为undefined
    const url = req.url
    const path = url.split('?')[0]
    const qstring = queryString.parse(url.split('?')[1])
    let resData = {
        method, type, url, path, qstring
    }
    res.setHeader('Content-type', 'application/json')
    if(method.toLowerCase() === 'get') {
        res.end(JSON.stringify(
            resData
        ))
    }
    if(method.toLowerCase() === 'post') {
        let postData = ''
        req.on('data', chunk => {
            postData +=chunk.toString()
        })
        req.on('end', () => {
            resData.postData = JSON.parse(postData)
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})

server.listen(3000, () => {
    console.log('server listen in 3000 port...')
})