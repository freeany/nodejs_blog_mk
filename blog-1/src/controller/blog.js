const { exec } = require('../db/mysql')
// 获取博客列表
const getList = (author = '', kw = '') => {
    // console.log(author, kw, 'getlist...')
    let sql = `select * from blog where 1=1 `
    if(author) {
        sql += `and author='${author}' `
    }
    if(kw) {
        sql += `and title like '%${kw}%' `
    }
    sql += 'order by createtime desc'

    return exec(sql)
}

// 获取博客详情
const getDetail = id => {
    const sql = `select * from blog where id='${id}'`
    return exec(sql).then(rows=> rows[0])
}

// 新建博客
const newBlog = (blogData = {}) => {
    // console.log(blogData, 'newBlog...')
    console.log(blogData, 'isnow..');
    const { title, content, author } = blogData
    const createTime = Date.now()
    const sql = `insert into blog (title, content, createtime, author)
        values ('${title}', '${content}', '${createTime}', '${author}')
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    // console.log(id, blogData, 'updateBlog...')
    const { title, content } = blogData
    const sql = `
        update blog set title='${title}', content='${content}' where id='${id}'
    `
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    // console.log(id, 'deleteBlog')
    const sql = `delete from blog where id='${id}' and author='${author}'`
    return exec(sql).then(deleteData => {
        if(deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}