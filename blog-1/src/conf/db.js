const env = process.env.NODE_ENV // 获取环境参数

// 配置
let MYSQL_CONF = {}
if(env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'mysqlroot',
        port: '3306',
        database: 'myblog'
    }
}

if(env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'mysqlroot',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}