const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const music = new Schema({
    _iduser:String,
    name:String,
    author:String,
    link:String,
    namefile:String,
    image:String,
},{
    timestamps: true
  })
module.exports=mongoose.model('music',music);