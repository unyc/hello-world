/**
 * Created by Nana on 14/05/16.
 * Client Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var GreaterSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	user: String, 
	name: String,  
	mobile:String, 
	email:String, 
	date:Date,
	amount: String, 
	type: String, 
	mode: String, 
	currency: String
})

module.exports=mongoose.model('Greater', GreaterSchema);