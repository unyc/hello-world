var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var price_WholeDaySchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    category:String,
    price:Number,
    branch:String,
    type:String,
    customer_type:String,

  
}); 

module.exports=mongoose.model('price_WholeDay', price_WholeDaySchema);