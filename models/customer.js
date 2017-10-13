
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CustomerSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    username:String,
    branch: String,
    name:String, 
    contact:String, 
    email:String, 
    country:{
		type: String,
		default: 'Ghana'
	},
    customer_type:String

}); 

module.exports=mongoose.model('Customer', CustomerSchema);