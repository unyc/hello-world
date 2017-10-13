

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var BranchSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },  
    name:String, 
    exchange_rate:String, 
    supervisor:String, 
    username:String
  
});

module.exports=mongoose.model('Branch', BranchSchema);