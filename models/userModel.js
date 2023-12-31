const mongoose = require('mongoose')
const userModel = new mongoose.Schema({ 
    name: String, 
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    token:String
})
const UserModel = mongoose.model('User', userModel)

module.exports = UserModel; 