var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Duration_TypeSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    type:Number,
    value:String

  
}); 

module.exports=mongoose.model('Duration_Type', Duration_TypeSchema);