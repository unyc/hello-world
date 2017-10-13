
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var FuelSchema = new Schema({
	created:{
		type: Date, 
		default: Date.now
	},
	
	vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle' },
	user:String,
	amount:Number

	
}); 

module.exports=mongoose.model('Fuel', FuelSchema);