const http = require('http')
const app = require('../app')

const server = http.createServer(app)

server.listen(3000, () => {
    console.log('server listen in 3000 port...')
})