
const pagination = (req)=>{
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const skip = (page-1)*limit
  return {skip,limit}
}


module.exports = {
  pagination
}