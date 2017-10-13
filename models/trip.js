var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var TripSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    username:String,
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    service_type:String,
    driver_name:String,
    customer_name:String,
    customer_type:String,
    zone:String,
    vehicle_reg_number:String,     
    destination:String,
    opening_odometer:Number,
    closing_odometer:Number,
    date:{
        type: Date, 
        default: Date.now
    },
    user:String,
    preferences:String,   
    amount:Number,
    status:{
        type: String, 
        default: 'Open'
    },
    branch: { type: Schema.Types.ObjectId, ref: 'Branch' },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    driver:{ type: Schema.Types.ObjectId, ref: 'Driver'},
    //coordinate: {type:{type:String,default:'Point'}, coordinates:[]}
   
}); 

module.exports=mongoose.model('Trip', TripSchema);