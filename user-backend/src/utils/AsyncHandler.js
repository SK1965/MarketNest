
const AsyncHandler = (RequestHandler)=>{
    return async(req , res, next)=>{
    await Promise.resolve(RequestHandler(req,res,next).catch(err=>next(err)))
}
}

module.exports = AsyncHandler