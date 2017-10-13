/**
 * Created by Nana on 17/06/16.
 * Chart of Accounts  Model
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RoadWorthySchema = new Schema ({
	created:{
		type: Date, 
		default: Date.now
	},
	 vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle' },
	 roadworthy_expiry:Date,
	username:String,
	branch: String,
	}); 

module.exports=mongoose.model('RoadWorthy', RoadWorthySchema);