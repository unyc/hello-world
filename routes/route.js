/**
 * Created by Sandeep on 01/06/14.
 */


var Login =require('../models/login'),
    Driver = require('../models/driver'),
    Vehicle = require('../models/vehicle'),
    Spare = require('../models/spare'),
    Maintenance=require('../models/maintenance_'),
    Customer = require('../models/customer'),
    Garage = require('../models/garage'),
    Branch=require('../models/branch'),
    Trip=require('../models/trip'),
    Issue=require('../models/issue'),
    IssueMgt=require('../models/issuemgt'),
    Roadworthy=require('../models/roadworthy'),
    Trial=require('../models/trial'),
    Insurance=require('../models/insurance'),    
    Price_Table=require('../models/price_table'), 
    Prices_Within=require('../models/prices_within'), 
    Prices_Outside=require('../models/price_outside'), 
    Category_Setup = require('../models/category_setup_'),
    Car_make_setup = require('../models/car_make_setup'),
    Issue_type_setup = require('../models/issue_type_setup'),
    Lost_Items=require('../models/lost_items'),
    Fuel=require('../models/fuel'),

    dateFormat = require('dateformat'),
    requestify=require('requestify'),
    mongoose = require('mongoose'),
    csv = require("fast-csv"),
    Flutterwave = require('flutterwave'),
    Token=require('../models/token'),
    express=require('express');
    md5 = require('md5');
    // phash = require('phash-image');
   

var MSSQLConnector = require( "node-mssql-connector" );
MSSQLClient = new MSSQLConnector( {
    settings: {
        max: 20,
        min: 0,
        idleTimeoutMillis: 30000,
        detailerror: true 
    },
    connection: {
        userName: "sa",
        password: "M1Fleet",
        server: "97.74.229.148",
        options: {
            database: "M1FleetV3"
        }
    }
})



var router=express.Router();
/* Testing Ms sql */



var aws = require('aws-sdk');

//console.log(process.env.accessKeyId);
aws.config.update(
  { "accessKeyId":process.env.accessKeyId , "secretAccessKey": process.env.secretAccessKey }
); 

const S3_BUCKET = process.env.S3_BUCKET; 
//console.log(S3_BUCKET); 

/* Testing Ms sql */


/* S3 file upload */


////////////////////////////////////////////////////////////////
/*
//connect to our mongo database
 
var db = mongoose.connection;
 
mongoose.connect('mongodb://localhost:27017/fmsdb');
 
 
 
//if we have any errors, show them in console
 
db.on('error', function (err) {
 
    console.log('connected ' + err.stack);
 
});
 
 
 
//when we disconnect from mongo, show this in console
 
db.on('disconnected', function(){
 
    console.log('disconnected');
 
});
 
 
 
//when we connect to mongo, show this in console
 
db.on('connected',function(){
 
    console.log('connected');
 
 
 
    //load some data to the database
 
    csv.fromPath('medium.csv', {headers : true})
 
        .on("data", function(data){
 
            var record = new Prices_Outside(data);
 
            record.save( function( err, user ){
 
                if(!err){
 
                    console.log('Saved prices outside accra');
 
                }
 
                else{
                    
                    console.log(err);
 
                }
 
            });
 
        })
 
        .on("end", function(){
 
            console.log("done");
 
        });
 
});
 
 


*/

                var mysql = require('mysql'); 
                var db_config ={ 
                host : '160.153.129.31', 
                password : 'Innova@2017', 
                database : 'cragdb', 
                user : 'cocoahub', 
                pool : { maxConnections: 50, maxIdleTime: 30}, 
                }; 


                var connection; 

                function handleDisconnect() { 
                connection = mysql.createConnection(db_config); // Recreate the connection, since 
                // the old one cannot be reused. 

                connection.connect(function(err) { // The server is either down 
                if(err) { // or restarting (takes a while sometimes). 
                //console.log('error when connecting to db:', err); 
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect, 
                } // to avoid a hot loop, and to allow our node script to 
                }); // process asynchronous requests in the meantime. 
                // If you're also serving http, display a 503 error. 
                connection.on('error', function(err) { 
                //console.log('db error', err); 
                if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually 
                handleDisconnect(); // lost due to either server restart, or a 
                } else { // connnection idle timeout (the wait_timeout 
                throw err; // server variable configures this) 
                } 
                }); 
                } 

                handleDisconnect(); 



                //configure routes 

                var router=express.Router(); 



                // router.route('/nana_test') 
                // .get(function(req, res){ 

                //     connection.query("select * from dbo.Device", function(err, rows, fields){ 
                //          if (!err) 
                //             res.json(rows); 
                //          else 
                //              res.send(err) 
                //          }); 

                // }) 


                    router.route('/sign-s3')
                    .get(function(req, res){
                      // console.log(req.query['file'])



                      const s3 = new aws.S3(); 
                      const fileName = req.query['file-name']; 

                      const fileType = req.query['file-type']; 


                      console.log(fileName);
                      console.log(fileType);


                      const s3Params = {
                          Bucket: S3_BUCKET, 
                          Key: fileName, 
                          Expires: 60, 
                          ContentType: fileType, 
                          ACL:'public-read', 
                      }; 

                      s3.getSignedUrl('putObject', s3Params,function (err, data){
                          if(err){
                            return res.send(); 
                          }
                          const returnData = {
                              signedRequest:data, 
                             // url:'https://${S3_BUCKET}.s3.amazonaws.com/${fileName}'
                              url:'https://'+S3_BUCKET+'.s3.amazonaws.com/'+fileName
                            
                          } 
                          //console.log(returnData);
                        res.write(JSON.stringify(returnData)); 
                        res.end(); 
                      });
                    });











         // router.route('/login')
         //    .post(function(req,res){

               

         //        //hash the password from req.body
         //        var hash = md5(req.body.password);

         //        connection.query("SELECT * FROM user where username='"+req.body.username+"'", function(err, rows1, fields){ 
         //             if (!err) 
         //                {
         //                     if(rows1[0]){
                             
         //                  //console.log(req.body.password);
                                          
         //                              if(rows1[0].password === hash){
         //                                  // rows[0].password=null; 
         //                                  // res.json({status:0, message: rows})
         //                                  {

         //                                        if(rows1[0].role=="Input Dealer Location")
         //                                        {

         //                                               connection.query("SELECT * FROM input_dealer_location WHERE username='"+req.body.username+"'", function(err, rows, fields){ 
         //                                                 if (!err) 
         //                                                     {

         //                                                          var t={

         //                                                              role:rows1[0].role,
         //                                                              username:req.body.username,
         //                                                              inputdealer_id:rows[0].inputdealer_id,
         //                                                              location_id:rows[0].location_id,
         //                                                          }
                                                                
         //                                                         res.json({status:0,message:t});

         //                                                     }
         //                                                 else 
         //                                                     res.send(err) 
         //                                                 });
         //                                        }
         //                                        else if(rows1[0].role=="PC")
         //                                        {

         //                                               connection.query("SELECT * FROM pc WHERE username='"+req.body.username+"'", function(err, rows, fields){ 
         //                                                 if (!err) 
         //                                                     {
         //                                                         var t={

         //                                                                  role:rows1[0].role,
         //                                                                  username:req.body.username,
         //                                                                  pc_id:rows[0].pc_id,
         //                                                                  pc_name:rows[0].pc_name,
         //                                                                  lbc_name:rows[0].lbc_name,
         //                                                                  lbc_id:rows[0].lbc_id,
                                                                          
         //                                                          }
                                                                
         //                                                         res.json({status:0,message:t});

         //                                                     }
         //                                                 else 
         //                                                     res.send(err) 
         //                                                 });
         //                                        }
         //                                        else
         //                                        {

         //                                                 connection.query("SELECT * FROM user WHERE username='"+req.body.username+"'", function(err, rows, fields){ 
         //                                                 if (!err) 
         //                                                     {
                                                                 
                                                                
         //                                                         res.json({status:0,message:rows[0]});

         //                                                     }
         //                                                 else 
         //                                                     res.send(err) 
         //                                                 });


         //                                        }

         //                                  }
         //                              }else
         //                              {
         //                                  res.json({status:1, message:'Invalid Password'})
         //                              }
         //                        }
         //                        else
         //                        {
         //                             res.json({status:1, message:'Invalid Username1'})
         //                        } 
         //                }
         //             else 
         //                  res.json({status:1, message:'Invalid Username'})
         //         }); 


         //    })

         
            router.route('/login')
            .post(function(req,res){

               

                //hash the password from req.body
                var hash = md5(req.body.password);

                connection.query("SELECT * FROM user where username='"+req.body.username+"'", function(err, rows, fields){ 
                     if (!err) 
                        {
                             if(rows[0]){
                             
                          //console.log(req.body.password);
                                          
                                      if(rows[0].password === hash){
                                          // rows[0].password=null; 
                                          // res.json({status:0, message: rows})
                                         

                                                var t={
                                                    access:rows[0].access,
                                                    company:rows[0].company,
                                                    username:rows[0].username
                                                }

                                                 res.json({status:1,message:t});
                                          

                                                        
                                               

                                          
                                      }else
                                      {
                                          res.json({status:0, message:'Invalid Password'})
                                      }
                                }
                                else
                                {
                                     res.json({status:0, message:'Invalid Username1'})
                                } 
                        }
                     else 
                          res.json({status:0, message:'Invalid Username'})
                 }); 


            })



           router.route('/login_input')
            .post(function(req,res){

               

                //hash the password from req.body
                var hash = md5(req.body.password);

                var t={
                        username:req.body.username,
                        password:hash

                     };


                connection.query("INSERT INTO user SET ?",t, function(err, rows, fields){ 
                     if (!err) 
                        {
                              res.json({status:1, message:rows})
                        }
                     else 
                          res.json({status:0})
                 }); 


            })


         





            //company_profile
             router.route('/company') 
                    .post(function(req, res){ 
    

                          var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                        for( var i=0; i < 5; i++ )
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="CO"+text;

                        var t=
                          {
                              date:new Date().toJSON().substr(0,  10),
                              company_id:theid,
                              company_name: req.body.company_name,
                              address: req.body.address,
                              phone_number: req.body.phone_number,
                              email: req.body.email,
                              website: req.body.website,
                              gta_certificate_expiry: req.body.gta_certificate_expiry,
                              fc_firstname: req.body.fc_firstname,
                              fc_middlename: req.body.fc_middlename,
                              fc_lastname: req.body.fc_lastname,
                              fc_rank: req.body.fc_rank,
                              fc_phonenumber: req.body.fc_phonenumber,
                              fc_emailaddress: req.body.fc_emailaddress,
                              sc_firstname: req.body.sc_firstname,
                              sc_middlename: req.body.sc_middlename,
                              sc_lastname: req.body.sc_lastname,
                              sc_rank: req.body.sc_rank,
                              sc_phonenumber: req.body.sc_phonenumber,
                              sc_emailaddress: req.body.sc_emailaddress,
                              total_current_assets: req.body.total_current_assets,
                              total_current_liabilities: req.body.total_current_liabilities,
                              total_owners_stockers_equity: req.body.total_owners_stockers_equity,
                              total_fixed_assets: req.body.total_fixed_assets,
                              total_longterm_liabilities: req.body.total_longterm_liabilities,
                              other_assets: req.body.other_assets
                          };



                      //console.log(string);
                      connection.query("INSERT INTO company SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/company') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM company", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

             router.route('/company_dash') 
                    .get(function(req, res){ 
                         var total;
                      //console.log(string);
                      connection.query("SELECT * FROM company", function(err, rows, fields){
                        if(!err)
                        {
                           total=rows.length;
                          res.json({message:total,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })


             router.route('/company_total_bycompany_pie') 
                    .get(function(req, res){ 
                       
                      //console.log(string);
                      connection.query("SELECT count(*) as value, company_name as label FROM company group by company_name", function(err, rows, fields){
                        if(!err)
                        {
                          
                          res.json({message:rows,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })

             router.route('/company_by_name/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM company WHERE company_name='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


                 router.route('/financial_by_company/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT total_current_assets,total_current_liabilities,total_owners_stockers_equity,total_fixed_assets,total_longterm_liabilities,other_assets FROM company WHERE company_name='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })
                router.route('/company_update/:id') 
                    .post(function(req, res){ 
                        
                 var anyname="UPDATE company SET company_name='"+req.body.company_name+"', address='"+req.body.address+"', phone_number='"+req.body.phone_number+"', email='"+req.body.email +"',website='"+ req.body.website+"',gta_certificate_expiry='"+req.body.gta_certificate_expiry+"',fc_firstname='"+req.body.fc_firstname+"', fc_middlename='"+req.body.fc_middlename+"', fc_lastname='"+req.body.fc_lastname+"', fc_rank='"+req.body.fc_rank+"', fc_phonenumber='"+req.body.fc_phonenumber+"', fc_emailaddress='"+req.body.fc_emailaddress+"',sc_firstname='"+req.body.sc_firstname+"', sc_middlename='"+req.body.sc_middlename+"', sc_lastname='"+req.body.sc_lastname+"', sc_rank='"+req.body.sc_rank+"', sc_phonenumber='"+req.body.sc_phonenumber+"', sc_emailaddress='"+req.body.sc_emailaddress+"',total_current_assets='"+req.body.total_current_assets+"', total_current_liabilities='"+req.body.total_current_liabilities+"', total_owners_stockers_equity='"+req.body.total_owners_stockers_equity+"', total_fixed_assets='"+req.body.total_fixed_assets+"', total_longterm_liabilities='"+req.body.total_longterm_liabilities+"', other_assets='"+req.body.other_assets+"', date='"+req.body.date+"' WHERE company_id='"+req.params.id+"'";

                    console.log(anyname);

                      connection.query(anyname, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


              //vehicle
             router.route('/vehicle') 
                    .post(function(req, res){ 
                    
                    // console.log(req.body);
                   
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                        for( var i=0; i < 5; i++ )
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="VE"+text;
                        var t=
                          {
                              date:new Date().toJSON().substr(0,  10),
                              fleet_id:theid,
                              car_make: req.body.car_make,
                              car_model: req.body.car_model,
                              car_type: req.body.car_type,
                              car_reg_number: req.body.car_reg_number,
                              manufacture_year: req.body.manufacture_year,
                              engine_capacity: req.body.engine_capacity,
                              fuel_type: req.body.fuel_type,
                              insurer: req.body.insurer,
                              car_reg_date: new Date(req.body.car_reg_date).toJSON().substr(0,  10) ,
                              insurance_expiry: new Date( req.body.insurance_expiry).toJSON().substr(0,10),
                              road_worthy_expiry: new Date (req.body.road_worthy_expiry).toJSON().substr(0,10),
                              company: req.body.company
                             
                          };
                          console.log(t);


                      // //console.log(string);
                      connection.query("INSERT INTO vehicle SET?",t, function(err, rows, fields){
                        console.log(rows);
                        console.log(err);
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/vehicle') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM vehicle", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

              router.route('/vehicle_dash') 
                    .get(function(req, res){ 
                         var total;
                      //console.log(string);
                      connection.query("SELECT * FROM vehicle", function(err, rows, fields){
                        if(!err)
                        {
                           total=rows.length;
                          res.json({message:total,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })


              router.route('/vehicle_by_carmake')
              .get(function(req,res){
                    connection.query("SELECT car_make,count(*) as total from vehicle group by car_make",function(err,rows,fields){
                        if(!err)
                        {
                            res.json({message:rows,status:1});
                        }
                        else
                        {
                          res.send({status:0});
                        }

                    })

              })

             router.route('/vehicle_by_cartype')
              .get(function(req,res){
                    connection.query("SELECT car_type,count(*) as total from vehicle group by car_type",function(err,rows,fields){
                        if(!err)
                        {
                            res.json({message:rows,status:1});
                        }
                        else
                        {
                          res.send({status:0});
                        }

                    })

              })

               router.route('/vehicle_by_company')
              .get(function(req,res){
                    connection.query("SELECT company,count(*) as total from vehicle group by company",function(err,rows,fields){
                        if(!err)
                        {
                            res.json({message:rows,status:1});
                        }
                        else
                        {
                          res.send({status:0});
                        }

                    })

              })



              router.route('/vehicle_insurance_expiry')
              .get(function(req,res){
                    connection.query("SELECT insurance_expiry,count(*) as total from vehicle group by insurance_expiry",function(err,rows,fields){
                        if(!err)
                        {
                            res.json({message:rows,status:1});
                        }
                        else
                        {
                          res.send({status:0});
                        }

                    })

              })

              router.route('/vehicle_total_bycompany') 
                    .get(function(req, res){ 
                       
                      //console.log(string);
                      connection.query("SELECT count(*) as total, company FROM vehicle group by company", function(err, rows, fields){
                        if(!err)
                        {
                          
                          res.json({message:rows,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })

                    router.route('/vehicle_total_bycompany_line') 
                    .get(function(req, res){ 
                       
                      //console.log(string);
                      connection.query("SELECT count(*) as a, company as y FROM vehicle group by company", function(err, rows, fields){
                        if(!err)
                        {
                          
                          res.json({message:rows,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })


             //   router.route('/vehicle_total_bycompany_pie') 
             //        .get(function(req, res){ 
                       
             //          //console.log(string);
             //          connection.query("SELECT count(*) as value, company as label FROM driver group by company", function(err, rows, fields){
             //            if(!err)
             //            {
                          
             //              res.json({message:rows,status:1});
             //            }
             //            else
             //              res.send({status:0});
             //          })

             // })

            // router.route('/driver_total_bycompany_line') 
            //         .get(function(req, res){ 
                       
            //           console.log("hello");
            //           connection.query("SELECT COUNT(case when driver.license_class='C' then 1 end) as a,COUNT(case when driver.license_class='D' then 1 end) as b, company as y FROM driver group by company", function(err, rows, fields){
            //             if(!err)
            //             {
                          
            //               res.json({message:rows,status:1});
            //             }
            //             else
            //               res.send({status:0});
            //           })

            //  })


              router.route('/users') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM user", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/vehicle/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM vehicle WHERE company='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


             router.route('/update_vehicle/:id') 
                    .post(function(req, res){ 
                        
                 var anyname="UPDATE vehicle SET car_make='"+req.body.car_make+"', car_model='"+req.body.car_model+"', car_reg_number='"+req.body.car_reg_number+"', car_type='"+req.body.car_type +"',manufacture_year='"+ req.body.manufacture_year+"',engine_capacity='"+req.body.engine_capacity+"',fuel_type='"+req.body.fuel_type+"', insurer='"+req.body.fuel_type+"', insurer='"+req.body.fuel_type+"', car_reg_date='"+req.body.car_reg_date+"', insurance_expiry='"+req.body.insurance_expiry+"', road_worthy_expiry='"+req.body.road_worthy_expiry+"',company='"+req.body.company+"' WHERE fleet_id='"+req.params.id+"'";

                    console.log(anyname);

                      connection.query(anyname, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



                  //driver
             router.route('/driver') 
                    .post(function(req, res){ 
                    
                        var text = "";
                        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                        for( var i=0; i < 5; i++ )
                            text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="DR"+text;

                        var t=
                          {
                              date: new Date().toJSON().substr(0,  10),
                              driver_ID:theid,
                              first_name: req.body.first_name,
                              middle_name: req.body.middle_name,
                              last_name: req.body.last_name,
                              phone_number: req.body.phone_number,
                              license_class: req.body.license_class,
                              license_expiry: new Date(req.body.license_expiry).toJSON().substr(0,10),
                              license_next_renewal: new Date(req.body.license_next_renewal).toJSON().substr(0,10),
                              additional_info: req.body.additional_info,
                              company: req.body.company
                            
                          };



                      //console.log(string);
                      connection.query("INSERT INTO driver SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })




             router.route('/driver') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM driver", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

                router.route('/driver_dash') 
                    .get(function(req, res){ 
                         var total;
                      //console.log(string);
                      connection.query("SELECT * FROM driver", function(err, rows, fields){
                        if(!err)
                        {
                           total=rows.length;
                          res.json({message:total,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })

              router.route('/update_driver/:id') 
                    .post(function(req, res){ 
                        
                 var anyname="UPDATE driver SET first_name='"+req.body.first_name+"', middle_name='"+req.body.middle_name+"', last_name='"+req.body.last_name+"', phone_number='"+req.body.phone_number +"',license_class='"+ req.body.license_class+"',license_expiry='"+req.body.license_expiry+"',license_next_renewal='"+req.body.license_next_renewal+"', additional_info='"+req.body.additional_info+"',company='"+req.body.company+"' WHERE driver_ID='"+req.params.id+"'";

                    console.log(anyname);

                      connection.query(anyname, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })





             router.route('/driver_by_number/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM driver WHERE phone_number='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

             router.route('/driver/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM driver WHERE company='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


               router.route('/driver_total_bycompany_pie') 
                    .get(function(req, res){ 
                       
                      //console.log(string);
                      connection.query("SELECT count(*) as value, company as label FROM driver group by company", function(err, rows, fields){
                        if(!err)
                        {
                          
                          res.json({message:rows,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })


             //staff
             router.route('/staff') 
                    .post(function(req, res){ 
      
                      var text = "";
                      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                      for( var i=0; i < 5; i++ )
                          text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="ST"+text;
                

                        var t=
                          {
                              date: new Date().toJSON().substr(0,  10),
                              staff_ID: theid,
                              first_name: req.body.first_name,
                              middle_name: req.body.middle_name,
                              last_name: req.body.last_name,
                              phone_number: req.body.phone_number,
                              position: req.body.position,
                              job_description: req.body.job_description,
                              company: req.body.company
                             
                            
                          };



                      //console.log(string);
                      connection.query("INSERT INTO staff SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/staff') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM staff", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

                router.route('/staff_dash') 
                    .get(function(req, res){ 
                         var total;
                      //console.log(string);
                      connection.query("SELECT * FROM staff", function(err, rows, fields){
                        if(!err)
                        {
                           total=rows.length;
                          res.json({message:total,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })

              router.route('/staff_by_gender')
              .get(function(req,res){
                    connection.query("SELECT gender,count(*) as total from staff group by gender",function(err,rows,fields){
                        if(!err)
                        {
                            res.json({message:rows,status:1});
                        }
                        else
                        {
                          res.send({status:0});
                        }

                    })

              })


              router.route('/staff_total_bycompany') 
                    .get(function(req, res){ 
                       
                      //console.log(string);
                      connection.query("SELECT count(*) as total, company FROM staff group by company", function(err, rows, fields){
                        if(!err)
                        {
                          
                          res.json({message:rows,status:1});
                        }
                        else
                          res.send({status:0});
                      })

             })

              router.route('/insurer') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM insurer", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


             router.route('/staff_by_number/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM staff WHERE phone_number='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

             router.route('/update_staff/:id') 
                    .post(function(req, res){ 
                        
                     var anyname="UPDATE staff SET first_name='"+req.body.first_name+"', middle_name='"+
                     req.body.middle_name+"', last_name='"+req.body.last_name+"', phone_number='"+
                      req.body.phone_number +"', position='"+req.body.position
                      +"',job_description='"+ req.body.job_description+"',company='"+req.body.company+"' WHERE staff_ID='"+req.params.id+"'";


                      connection.query(anyname, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

                     router.route('/staff/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM staff WHERE company='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })




              //messages
             router.route('/messages') 
                    .post(function(req, res){ 
      
                      var text = "";
                      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                      for( var i=0; i < 5; i++ )
                          text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="ME"+text;
                

                        var t=
                          {
                              date: new Date().toJSON().substr(0,  10),
                              message_ID: theid,
                              sender: req.body.sender,
                              recipient: req.body.recipient,
                              subject: req.body.subject,
                              message: req.body.message,
                              sender_company: req.body.sender_company,
                              recipient_company: req.body.recipient_company,
                          };



                      //console.log(string);
                      connection.query("INSERT INTO messages SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/messages') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM messages", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

            router.route('/messages_for_recipient/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM messages where recipient='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

              router.route('/messages_by_sender/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM messages where sender='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

              router.route('/messages') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM insurer", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


             router.route('/messages_by_id/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM staff WHERE phone_number='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

             router.route('/update_messages/:id') 
                    .post(function(req, res){ 
                        
                     var anyname="UPDATE messages SET recipient='"+req.body.recipient+"', subject='"+
                     req.body.subject+"', message='"+req.body.message+"' WHERE message_id='"+req.params.id+"'";


                      connection.query(anyname, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


  
  
              //dues
             router.route('/dues') 
                    .post(function(req, res){ 
    
                      var text = "";
                      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                      for( var i=0; i < 5; i++ )
                          text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="DU"+text;
                

                        var t=
                          {
                              date: new Date().toJSON().substr(0,  10),
                              dues_id: theid,
                              member: req.body.member,
                              paid_in_by: req.body.paid_in_by,
                              payers_phonenumber: req.body.payers_phonenumber,
                              amount: req.body.amount,
                              duration: req.body.duration,
                              payment_method: req.body.payment_method,
                              additional_info: req.body.additional_info,
                            
                          };



                      //console.log(string);
                      connection.query("INSERT INTO dues SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/dues') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM dues", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


             router.route('/dues/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM dues WHERE member='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

            
                            
             router.route('/update_dues/:id') 
                        .post(function(req, res){ 
                            
                var anyname="UPDATE dues SET member='"+req.body.member+"', paid_in_by='"+
                req.body.paid_in_by+"', payers_phonenumber='"+req.body.payers_phonenumber+"', amount='"+
                req.body.amount +"', duration='"+req.body.duration+"',payers_phonenumber='"+ 
                req.body.payment_method  +"',additional_info='"+req.body.additional_info+"' WHERE dues_id='"+req.params.id+"'";


                          connection.query(anyname, function(err, rows, fields){
                            if(!err)
                              res.json({message:rows,status:1});
                            else
                              res.send({status:0});
                          })

                 })



             //setup
             router.route('/setup') 
                    .post(function(req, res){ 
                    

                      var text = "";
                      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                      for( var i=0; i < 5; i++ )
                          text += possible.charAt(Math.floor(Math.random() * possible.length));
                    
                        var theid="SE"+text;
                

                        var t=
                          {
                              date: new Date().toJSON().substr(0,  10),
                              alert_setup_ID:theid,
                              alert_sender_id: req.body.alert_sender_id,
                              alert_cc_phonenumber: req.body.alert_cc_phonenumber,
                              alert_cc_email: req.body.alert_cc_email,
                              mobile_money: req.body.mobile_money,
                              company: req.body.company.company_name
                             
                          };



                      //console.log(string);
                      connection.query("INSERT INTO setup SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })



             router.route('/setup') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM setup", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })


             router.route('/setup_by_senderid/:id') 
                    .get(function(req, res){ 
    
                      //console.log(string);
                      connection.query("SELECT * FROM setup WHERE alert_sender_id='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

             router.route('/update_alert_setup/:id') 
                    .post(function(req, res){ 
                        
                     var anyname="UPDATE setup SET alert_sender_id='"+req.body.alert_sender_id+"', alert_cc_phonenumber='"+
                     req.body.alert_cc_phonenumber+"', alert_cc_email='"+req.body.alert_cc_email+"', mobile_money='"+
                      req.body.mobile_money +"',company='"+req.body.company.company_name+"' WHERE alert_setup_ID='"+req.params.id+"'";


                      connection.query(anyname, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             })

             router.route('/make') 
                    .get(function(req, res){ 
                   

                      connection.query("SELECT * from make", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

          })

           router.route('/model') 
                    .get(function(req, res){ 
                   

                      connection.query("SELECT * from model", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

          })

          router.route('/model/:id') 
                    .get(function(req, res){ 
                   // console.log(req.params);

                      connection.query("SELECT * from model WHERE make='"+req.params.id+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

          })

            router.route('/manufactureyear/:make/:model') 
                    .get(function(req, res){ 
                   // console.log(req.params);

                      connection.query("SELECT * from model WHERE make='"+req.params.make+"' and model='"+req.params.model+"'", function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

          })
                    

                     
  




/* Account approval for 
1. Find client id
2. Increase counter on acct_account_db by 1
3. Update client data with base account
4. Set status of account to approva
 */


module.exports=router;
