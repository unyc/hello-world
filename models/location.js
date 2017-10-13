

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var locationSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },  
    name:String, 
    exchange_rate:String, 
    supervisor:String, 
    
  
});

module.exports=mongoose.model('Location', LocationSchema);