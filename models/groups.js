/**
 * Created by Sandeep on 01/06/14.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var GroupsSchema=new Schema({
    name:String,
    status:String, 
    male:{
    	type: String, 
    	default:'0'
    }, 
    female: {
    	type: String, 
    	default:'0'
    }
});

module.exports=mongoose.model('Groups',GroupsSchema);