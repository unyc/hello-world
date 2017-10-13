/**
 * Created by Nana on 14/05/16.
 * Client Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var InstitutionSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	name: String, 
    category:{type: Schema.Types.ObjectId, ref:'Categories'}, 
	location:String, 
	contact:String
})

module.exports=mongoose.model('Institution', InstitutionSchema);