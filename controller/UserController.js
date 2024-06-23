const User = require('../routes/models/UserModel')   
const jwt = require('jsonwebtoken') 

//create the function
const createToken = (_id) => {

    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'2h'})
}


//To login User 
const loginUser = async (req,res)=>{
    const {email, password} = req.body
    try{
       const user = await User.login(email,password) 

       const token = createToken(user._id)
       res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}
//To signup user 
const signupUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.signup (email,password);
            // Create a token
            const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    } 
} 

module.exports ={
    loginUser,
    signupUser
} 