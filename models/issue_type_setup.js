var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Issue_type_setupSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    name:String,
    description:String,  
  	username:String,
	branch: String,
}); 

module.exports=mongoose.model('Issue_type_setup', Issue_type_setupSchema);