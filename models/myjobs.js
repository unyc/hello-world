/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MyJobsSchema = new Schema({
	created:{
		type:Date, 
		default: Date.now
	},
	user:{ type: Schema.Types.ObjectId, ref: 'Login' },
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	description: String, 
	customer: { type: Schema.Types.ObjectId, ref: 'Login' },
	amount:{type:String, default:0}, 
	status:{type:String, default:'Pending'}
	
}); 

module.exports=mongoose.model('MyJobs', MyJobsSchema);