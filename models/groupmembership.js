/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var GroupMembershipSchema=new Schema({
	created:{
		type:Date, 
		default: Date.now
	}, 
	group:{ type: Schema.Types.ObjectId, ref: 'Groups' },
	member: { type: Schema.Types.ObjectId, ref: 'Members' },
	status: {
		type: String, 
		default:'0'
	}
});

module.exports=mongoose.model('GroupMembership',GroupMembershipSchema);