const { loginCheck } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')
const userHandleRouter = (req, res) => {
    const {method, path, query, postData} = req

    if(method.toLowerCase() === 'post' && path === '/api/user/login') {
        const { username, password } = JSON.parse(postData)
        return loginCheck(username, password).then(data => {
            if(data && data.username) {
                return new SuccessModel(data)
            }
            return new ErrorModel(data)
        })
    }

}

module.exports = userHandleRouter