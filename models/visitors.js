/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var VisitorsSchema = new Schema({
	surname: String, 
	othernames: String, 
	dob: String, 
	sex: String, 
	contacts: String, 
	email: String, 
	address: String, 

}); 

module.exports=mongoose.model('Visitors', VisitorsSchema);