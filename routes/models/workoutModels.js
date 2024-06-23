const mongoose = require('mongoose')

const Schema = mongoose.Schema


const workoutSchema = new  Schema({
    title: {
        type: String,
        required: true
    },
    repeat:{
        type:Number,
        required:true
    },
    load:{
        type: Number,
        required: true
    },
    userId:{
        type:String,
        required: true
    }
}, {timestamps:true})

module.exports = mongoose.model('Workout', workoutSchema)