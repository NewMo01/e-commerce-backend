
<<<<<<< HEAD

class AppError extends Error{
    constructor(){super()}

    create(msg,code, fail = false){
        this.message = msg
        this.code = code
        this.fail = fail
        return this
    }


}


=======
class AppError extends Error{
    constructor(){super()}

    create(message,code,data){
        this.message = message;
        this.code = code;
        this.data = data;
        return this;
    }
}

>>>>>>> 3660d0d81ea19ae5f235d781e6908fd456d15b4b
module.exports = new AppError()