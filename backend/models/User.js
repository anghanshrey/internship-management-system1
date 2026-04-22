const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

 name:{
  type:String,
  required:true
 },

 email:{
  type:String,
  required:true,
  unique:true
 },

 password:{
  type:String,
  required:true
 },

 role:{
  type:String,
  enum:["student","admin"],
  default:"student"
 },

 skills:{
  type:[String],
  default:[]
 },

 resume:{
  type:String
 },
 
 department:{
 type:String
},

enrollment:{
  type:String
 },
 
 profileImage:{
 type:String
},


});

module.exports =
mongoose.model("User",userSchema);