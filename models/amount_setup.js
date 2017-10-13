var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Amount_SetupSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    distance:Number,
    category:String,
    amount:Number,
   username:String,
  
}); 

module.exports=mongoose.model('Amount_Setup', Amount_SetupSchema);