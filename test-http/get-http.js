const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method
    const url = req.url
    const parseUrl = queryString.parse(url.split('?')[1])
    res.end(JSON.stringify(parseUrl))
})

server.listen(3000, () => {
    console.log('server in 3000 starting...')
})