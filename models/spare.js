

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SpareSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    username:String,
    branch: String,
    code:String, 
    name:String, 
    description:String, 
    date_modified:Date, 
    date_added:Date, 
}); 

module.exports=mongoose.model('Spare', SpareSchema);