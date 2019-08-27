var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);


var userSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    
})