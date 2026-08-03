const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is Required"]
    },
    email : {
        type : String,
        required : [true, "Email is Required"]
    },
    mobile_number : {
        type : Number,
        required : [true, "Mobile Number is Required"],
        minlength : 10,
        maxlength : 10
    },
    password : {
        type : String,
        required : [true, "Password is Required"],
        minlength : 8
    }
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;