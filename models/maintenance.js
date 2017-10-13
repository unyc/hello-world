/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MaintenanceSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	
	vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle' },
	issue:{ type: Schema.Types.ObjectId, ref: 'Issue' },
	user:String,
	amount:Number

	
}); 

module.exports=mongoose.model('Maintenance_', MaintenanceSchema);