
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var Lost_ItemsSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    description:String, 
    trip_date:String, 
    customer_name:String,
    username:String,
	branch: String,
}); 

module.exports=mongoose.model('Lost_Items', Lost_ItemsSchema);