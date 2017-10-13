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
	date:{
		type: Date, 
		default: Date.now
	},
	issue_id:{ type: Schema.Types.ObjectId, ref: 'Issue' },
	issue_name:String,	
	sent_by:{ type: Schema.Types.ObjectId, ref: 'Login' },
	returned_by:{ type: Schema.Types.ObjectId, ref: 'Login' },
	next_date:{
		type: Date, 
		default: Date.now
	},
	check:String,
	amount:Number,
	vehicle_reg_number:String,
	spare_name:[],
	spare_serial:[],
	spare_warranty:[],
	username:String,
	branch: String,

	
}); 

module.exports=mongoose.model('Maintenance_', MaintenanceSchema);