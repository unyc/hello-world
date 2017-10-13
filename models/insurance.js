/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var InsuranceSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	 vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle' },  
	 insurance_expiry:{
		type: Date, 
		default: Date.now
	},
	 username:String,
	branch: String,
	}); 

module.exports=mongoose.model('Insurance', InsuranceSchema);