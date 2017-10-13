

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var DriverSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },  
    mobile:String, 
    license_class:String, 
    license_no:String,
    username:String,
    branch: String,
    password:String, 
    license_expiry:{
        type: Date, 
        default: Date.now
    },
    renewal_first:{
        type: Date, 
        default: Date.now
    },
    renewal_second:{
        type: Date, 
        default: Date.now
    },
    status:String, 
    name:String, 
    vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle'},
  
});

module.exports=mongoose.model('Driver', DriverSchema);