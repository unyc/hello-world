

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var GarageSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    username:String,
    branch: String,
    name:String,
    location:String, 
    mobile:String, 
    contact_name:String, 
    vehicle:String,  
}); 

module.exports=mongoose.model('Garage', GarageSchema);

