/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var EntrySchema = new Schema({
	created:{
		type:Date, 
		default: Date.now
	},
	month:String, 
	sanctuary: { type: Schema.Types.ObjectId, ref: 'Sanctuary' },
	amount: String, 
	purpose: String

}); 

module.exports=mongoose.model('Entry', EntrySchema);