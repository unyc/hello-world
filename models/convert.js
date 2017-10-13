/**
 * Created by Nana on 14/05/16.
 * Client Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ConvertSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	firstname: String,  
	surname:String,
	email: String, 
	mobile: String, 
	age: String, 
	gender: String, 
	membership:String, 
	event:{
		type:String, 
		default:'Greater Works'
	}
})

module.exports=mongoose.model('Convert', ConvertSchema);