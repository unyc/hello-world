/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SupportSchema = new Schema({
	created:{
		type:Date, 
		default: Date.now
	},
	name:String, 
	description: String,

}); 

module.exports=mongoose.model('Support', SupportSchema);