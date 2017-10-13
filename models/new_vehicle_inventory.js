/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var New_Vehicle_InventorySchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},	
	vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle'},
	part_name:String,
	description:String,
	serial:String,
	warranty:String,
	date_added:Date
	
}); 

module.exports=mongoose.model('New_Vehicle_Inventory', New_Vehicle_InventorySchema);