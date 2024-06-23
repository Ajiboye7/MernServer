const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type : String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

// Create a Static method for User signup

userSchema.statics.signup = async function(email, password){
    //Validation 
    if(!email || !password){
        throw Error('All fields is required to be filled')
    }
    if(!validator.isEmail(email)){
        throw Error ('Email not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error ('password not strong enough')

    }
    // Check if email exits
    const exists = await this.findOne({email})
    if(exists)
        throw Error ('email already exist')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password:hash})
  
    return user
   
    
}
// create a static method for login 
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields is required to be filled')
    }
    const user = await this.findOne({email})
    if(!user) {
        throw Error('User does not exist')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error ('Invalid Password')
    }
    return user
       
}

module.exports = mongoose.model('User',userSchema)