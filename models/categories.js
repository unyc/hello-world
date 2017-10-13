/**
 * Created by Nana on 14/05/16.
 * Categories Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CategoriesSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	name:String, 
	description:String
}); 

module.exports=mongoose.model('Categories', CategoriesSchema);