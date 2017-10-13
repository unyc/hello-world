var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Category_SetupSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    name:String,
    description:String  
  
}); 

module.exports=mongoose.model('Category_Setup', Category_SetupSchema);