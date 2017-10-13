/**
 * Created by Sandeep on 01/06/14.
 */

// Load Our Modules

var express = require('express');
var bodyParser = require('body-parser');
var rout = require('./routes/route');
var mongoose = require('mongoose');
var cors = require('cors'); 



var app = express();
app.use(cors());


//connect to our database
//Ideally you will obtain DB details from a config file

// var dbName='fmsdb';

// var connectionString='mongodb://localhost:27017/'+dbName;

// mongoose.connect(connectionString);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api', rout);

module.exports = app;
