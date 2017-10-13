/**
 * Created by Nana on 14/05/16.
 * Client Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ClientSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	name: String,  
	location:String, 
	contact:String
})

module.exports=mongoose.model('Client', ClientSchema);