const { exec } = require('../db/mysql')
// 获取博客列表
const loginCheck = (username = '', password = '') => {
    // console.log(author, kw, 'getlist...')
    let sql = `select * from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}


module.exports = {
    loginCheck
}