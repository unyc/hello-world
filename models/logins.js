/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var LoginSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	username:String,  
	password:String,
	level:String, 
	branch: String, 
	name: String,
	mobile:String,
	email:String, 
	status:{
		type: String,
		default: 'active'
	} 
}); 

module.exports=mongoose.model('Login', LoginSchema);