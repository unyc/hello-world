var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var Car_make_setupSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    name:String,
    description:String,  
  	username:String,
	branch: String,
}); 

module.exports=mongoose.model('Car_make_setup', Car_make_setupSchema);