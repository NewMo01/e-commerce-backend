
class AppError extends Error{
    constructor(){super()}

    create(message,code,data){
        this.message = message;
        this.code = code;
        this.data = data;
        return this;
    }
}

module.exports = new AppError()