const { SuccessModel, ErrorModel } = require('../model/resModel') 
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')

const blogHandleRouter = (req, res) => {
    const {method, path, query, postData} = req
    const { id } = query

    if(method.toLowerCase() === 'get' && path === '/api/blog/list') {
        const { author, keyword } = query
        return getList(author, keyword).then(data => {
            return new SuccessModel(data)
        })
    }

    if(method.toLowerCase() === 'get' && path === '/api/blog/detail') {
        return getDetail(id).then(data => {
            return new SuccessModel(data)
        })
    }

    if(method.toLowerCase() === 'post' && path === '/api/blog/new') {
        let data = JSON.parse(postData)
        data.author = 'zhangsan' // 暂时使用假数据
       return newBlog(data).then(data => {
           return new SuccessModel(data)
       })
    }

    if(method.toLowerCase() === 'post' && path === '/api/blog/update') {
       return updateBlog(id, JSON.parse(postData)).then(data => {
        return data ?  new SuccessModel(data) : ErrorModel(data)
       })
    }


    if(method.toLowerCase() === 'post' && path === '/api/blog/del') {
        return deleteBlog(id, 'zhangsan').then(data => {
            return data ?  new SuccessModel(data) : new ErrorModel(data)
        })
    }

}

module.exports = blogHandleRouter