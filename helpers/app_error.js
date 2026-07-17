

class AppError extends Error{
    constructor(){super()}

    create(msg,code, fail = false){
        this.message = msg
        this.code = code
        this.fail = fail
        return this
    }


}


module.exports = new AppError()