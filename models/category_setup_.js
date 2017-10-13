var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Category_SetupSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    name:String,
    description:String,  
  	username:String,
	branch: String,
}); 

module.exports=mongoose.model('Category_Setup_', Category_SetupSchema);