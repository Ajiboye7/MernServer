const jwt = require('jsonwebtoken')
const User = require('../routes/models/UserModel')


const requireAuth = async (req, res, next)=>{ 
// verify Authentification
const {authorization} = req.headers
if(!authorization){
    return res.status(401).json({error:'Authorization token required'})
}
// extract the token
const token = authorization.split(' ')[1]
try{
    //extract and verify the id from the token
    const{_id} = jwt.verify(token, process.env.SECRET)
    req.user = await User.findOne({_id}).select('_id')
    next()
}catch(error){
    console.log(error)
    res.status(401).json({error:'Request is not authorized'})
}

}
module.exports = requireAuth






