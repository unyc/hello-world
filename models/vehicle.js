

var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var VehicleSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
  
    username:String,
    Device_ID:String,
    reg_number:String, 
    car_make:String,
    model:String,
    category:String,
    chassis:String,
    fuel_type:String,
    card_number:String,
    card_limit:String,
    balance:String,
    status:String,
    branch:String,
    insurance:{ type: Schema.Types.ObjectId, ref: 'Insurance'},
    cost:Number,
    depreciation:Number,
    date_of_purchase:{
        type: Date, 
        default: Date.now
    },
    percent_depreciation:Number,
    car_description:String,
    date_modified:{
        type: Date, 
        default: Date.now
    },
    date_added:{
        type: Date, 
        default: Date.now
    },
    driver:{ type: Schema.Types.ObjectId, ref: 'Vehicle'},
}); 

module.exports=mongoose.model('Vehicle', VehicleSchema);