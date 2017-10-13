/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var SanctuarySchema = new Schema({
	sanctuary: String, 
	district: String, 
	region: String, 
	pastor_name: String, 
	pastor_contact: String, 
	pastor_email: String
}); 

module.exports=mongoose.model('Sanctuary', SanctuarySchema);