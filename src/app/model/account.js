const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const account = new Schema({
    name:String,
    password:String,
    vip:Boolean,
    token:String,
    re_token:String,


},{timestamps:true})
module.exports=mongoose.model('account',account);