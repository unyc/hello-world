var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var IssuesSchema = new Schema({
    created:{
        type: Date, 
        default: Date.now
    },
    username:String,
    branch: String,
    date:{
        type: Date, 
        default: Date.now
    },
    user:String,
    description:String,
    type:String,
    status:{
        type: String, 
        default: 'Open'
    },
    vehicle:{ type: Schema.Types.ObjectId, ref: 'Vehicle' },

   
}); 

module.exports=mongoose.model('Issue', IssuesSchema);