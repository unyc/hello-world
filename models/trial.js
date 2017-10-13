/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var TrialSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	
	
	user:[Schema.Types.Mixed],
	username:String,
	branch: String,

	
}); 

module.exports=mongoose.model('Trial', TrialSchema);