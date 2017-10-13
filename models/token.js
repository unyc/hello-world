var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var TokenSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    cardno:String,
    token:String,
    transaction_id:Number

   
  
}); 

module.exports=mongoose.model('Token', TokenSchema);