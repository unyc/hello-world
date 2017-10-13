var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var AmountSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    distance:Number,
    category:String,
    amount:Number
   
  
}); 

module.exports=mongoose.model('Amount', AmountSchema);