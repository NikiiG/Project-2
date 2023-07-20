const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

 const addressSchema = new Schema({
    street:{
        type:String,
        required:true
     },
     city:{
        type:String,
        required:true
     },
     state:{
        type:String,
        required:true
     },
     zip:{
        type:Number,
        required:true
     },
 },{
    timestamps:true
 });

 module.exports = mongoose.model('Address', addressSchema);