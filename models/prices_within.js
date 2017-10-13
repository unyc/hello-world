var mongoose = require('mongoose');
 
var Schema=mongoose.Schema;


var PricesWithin_Schema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },  
    car_make:String,
    username:String,
    branch:String, 
    first:Number,
    second:Number,
    third:Number,
    fourth:Number,
    fifth:Number,
    sixth:Number,
    destination:String,
    zone:String,
    customer_type:String,
    service_type:String,
}); 

module.exports=mongoose.model('PricesWithin', PricesWithin_Schema);

 
//make sure that we are closing the connection to mongo if something happens to node (like Ctrl + C)
 /*
process.on('SIGINT', function() {
 
    mongoose.connection.close(function () {
 
        process.exit(0);
 
    });
 
});*/