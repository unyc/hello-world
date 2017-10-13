/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MaintenanceSparesSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	
	maintenance:{ type: Schema.Types.ObjectId, ref: 'Maintenance' },
	spare:{ type: Schema.Types.ObjectId, ref: 'Spare' },
	serial:String,
	warranty:String
	
}); 

module.exports=mongoose.model('MaintenanceSpares', MaintenanceSparesSchema);