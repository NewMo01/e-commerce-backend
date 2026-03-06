
const jwt = require('jsonwebtoken');
const AppError = require('../helpers/app_error');


module.exports = async(req, res, next) => {

    if(!req.headers.authorization){
        return next(AppError.create('Authorization token is required',401))
    }
    const token = req.headers.authorization.split(' ')[1]

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if(!decoded){
        return next(AppError.create('fail',400,{message:'invalid token'}))
    }
    req.user = decoded
    next()

}