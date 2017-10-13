/**
 * Created by Nana on 14/05/16.
 * Client Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SchoolsSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	name: String, 
    institution:{type: Schema.Types.ObjectId, ref:'Institution'}, 
	year:String, 
	class:String, 
	programme: String
})

module.exports=mongoose.model('Schools', SchoolsSchema);