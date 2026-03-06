
const AppError = require('../helpers/app_error')

module.exports = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return next(AppError.create('You are not authorized',401))
        }
        next()
    
}
}