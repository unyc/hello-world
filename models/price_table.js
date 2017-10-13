var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Price_TableSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },  
    car_make:String,
    branch:String, 
    first:Number,
    second:Number,
    third:Number,
    fourth:Number,
    fifth:Number,
    sixth:Number,
    price:Number,
    destination:String,
    zone:String,
    customer_type:String,
    service_type:String,
    username:String, 
}); 

module.exports=mongoose.model('Price_Table', Price_TableSchema);