

module.exports = function(req){
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = (page-1)*limit

    return {limit,skip}
}