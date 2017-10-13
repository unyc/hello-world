/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MyCategorySchema = new Schema({
	category:{ type: Schema.Types.ObjectId, ref: 'Category' },
	user:{ type: Schema.Types.ObjectId, ref: 'Login' },
	status :{
		type: String, 
		default:'0'
	}
}); 

module.exports=mongoose.model('MyCategory', MyCategorySchema);