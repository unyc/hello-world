/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var CompanySchema = new Schema({
	created:{
		type:Date, 
		default: Date.now
	},
	/*
	name:String, 
	location: String, 
	address: String, 
	phone: String, 
	mobile: String, 
	website: String, 
	about: String, 
	description: String, 
	email: String,
	categories: [String], 
	keywords: String, 
	pics: String, 
	sanctuary: { type: Schema.Types.ObjectId, ref: 'Sanctuary' },
	amount: String, 
	purpose: String*/


	name: String, 
	company: String, 
	email: String, 
	location: String, 
	categories: [String], 
	description: String, 
	price: String, 
	voter: String, 
	business: String, 
	security: String, 
	answer: String, 
	telephone: String,
	mobile: String, 
	dob: Date, 
	sex: String, 
	pics:[String]

}); 

module.exports=mongoose.model('Company', CompanySchema);