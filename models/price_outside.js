var mongoose = require('mongoose');
 
var Schema=mongoose.Schema;


var PricesOutside_Schema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },  
    car_make:String,
    branch:String,
    username:String, 
    price:Number,
    destination:String,
    zone:String,
    customer_type:String,
    service_type:String,
}); 

module.exports=mongoose.model('PricesOutside', PricesOutside_Schema);

 
//make sure that we are closing the connection to mongo if something happens to node (like Ctrl + C)
 /*
process.on('SIGINT', function() {
 
    mongoose.connection.close(function () {
 
        process.exit(0);
 
    });
 
});*/