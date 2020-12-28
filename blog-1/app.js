const queryString = require('querystring')
const blogHandleRouter = require('./src/router/blog')
const userHandleRouter = require('./src/router/user')
const { resolve } = require('path')

const getPostData = req => {
    if (req.method.toLowerCase() === 'post' && req.headers['content-type'] === 'application/json') {
        return new Promise(resolve => {
            let postData = ''
            req.on('data', chunk => postData += chunk.toString())
            req.on('end', () => {
                resolve(postData) // 如果post请求没传数据则是空字符串
            })
        })
    } else {
        return Promise.resolve({})
    }
}
/**
 * 此处表明，
 * req.path(?前面的请求路径), req.query(get请求的查询字符串), req.body(post请求的data数据) 均为自定义数据放到req对象上的 
 */
const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    // 获取path  并存放
    const path = url.split('?')[0]
    req.path = path

    // 获取query 并存放
    req.query = queryString.parse(url.split('?')[1])
    // 处理博客路由接口
    getPostData(req).then(data => {
        req.postData = data ? data : {}
        const blogRouterResult = blogHandleRouter(req, res)
        if (blogRouterResult) {
            blogRouterResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }
        // 处理用户路由接口
        const userRouterResult = userHandleRouter(req, res)
        if (userRouterResult) {
            userRouterResult.then(userData => {
                res.end(JSON.stringify(userData))
            })
            return
        }
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.write('404 not found \n')
        res.end()
    })
}

module.exports = serverHandle