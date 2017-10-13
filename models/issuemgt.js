var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var IssueManagementSchema = new Schema({
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
    status:String,
    issue_id: { type: Schema.Types.ObjectId, ref: 'Issue' },
  
}); 

module.exports=mongoose.model('IssueManagement', IssueManagementSchema);