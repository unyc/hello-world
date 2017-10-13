/**
 * Created by Sandeep on 01/06/14.
 */

var Movie=require('../models/movie'), 
Login =require('../models/login'),
Category = require('../models/category'),
Support = require('../models/support'),
MyCategory = require('../models/mycategory'),
MyJobs = require('../models/myjobs'),
Company = require('../models/company'),
Sanctuary = require('../models/sanctuary'),
requestify = require('requestify');

var express=require('express');

//configure routes

var router=express.Router();


//login module


router.route('/sms')
        .post(function(req, res){

            if(req.body.telephone.length===10){
      list = '233'+ req.body.telephone.substr(1, 9);
     
    }else{
        list =req.body.telephone;
    }

            requestify.get('http://server.txtmeghana.com/sendtxt/sms.php?username=kofi247@2016&password=kofi247@2016&to='+list +'&message='+req.body.message +'&name=KOFI247').then(function(response) {
            // Get the response body
            response.getBody();
            res.send(response.getBody())
        });
    })

router.route('/login')
    .get(function(req,res){
       Login.find(function(err,movies){
           if(err)
              {
                res.send(err);
              }
            res.json(movies)
       });
    })
    .post(function(req,res){
        var movie=new Login(req.body);
        movie.password='ghana';
        movie.type = 'tech';
        movie.save(function(err){
            if(err)
               { res.send(err); }
                 else{
          var list =''; 
          var message = 'Dear '+req.body.name+' , your password is ghana' ;
            if(req.body.telephone.length===10){
              list = '233'+ req.body.telephone.substr(1, 9);
             
            }else{
                list =req.body.telephone;
                  }

                          requestify.get('http://server.txtmeghana.com/sendtxt/sms.php?username=kofi247@2016&password=kofi247@2016&to='+list +'&message='+message +'&name=KOFI247').then(function(response) {
                          // Get the response body
                          response.getBody();
                          res.send(response.getBody())
                      });
            }

        });
    });

router.route('/password/:id')
    .put(function(req,res){
        Login.findOne({_id:req.params.id},function(err,movie){

            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })



router.route('/login/:id')
    .put(function(req,res){
        Movie.findOne({_id:req.params.id},function(err,movie){

            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
    .post(function(req, res){
        Login.findOne({username: req.params.id}, function(err, details){
            if(err){
                res.send(err)
            }
            else if(details){
                if(details.password === req.body.password){
        Company.findOne({mobile:details.username},function(err,movie){
                 //console.log(movie)
                 var data = {
                    status:0,
                    type:details.type,
                    username: details.username, 
                    categories: movie.categories, 
                    pics: movie.pics,
                    message: details
                 }
                 res.json(data);
              })
              //res.json(movies);

           


                }else
                {
                    res.send({status:1, message:'Invalid Username or Password'})
                }
            }
        })
    })
      .delete(function(req,res){
          Login.remove({
              _id: req.params.id
          }, function(err, movie) {
              if (err)
                  res.send(err);
              res.json({ message: 'Successfully deleted' });
          });
    })

// Category

router.route('/category')
    .get(function(req,res){
       Category.find(function(err,movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    })
    .post(function(req,res){
        var movie=new Category(req.body);
        movie.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'User addedd'});
        });
    });
    
router.route('/category/:id')
  .delete(function(req,res){
      Category.remove({
          _id: req.params.id
      }, function(err, movie) {
          if (err)
              res.send(err);
          res.json({ message: 'Successfully deleted' });
      });
    })
     .put(function(req,res){
        Category.findOne({_id:req.params.id},function(err,movie){

            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
// my category

router.route('/support')
    .get(function(req,res){
       Support.find(function(err,movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    })
    .post(function(req,res){
        var movie=new Support(req.body);
        movie.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'User addedd'});
        });
    });
    
router.route('/support/:id')
  .delete(function(req,res){
      Support.remove({
          _id: req.params.id
      }, function(err, movie) {
          if (err)
              res.send(err);
          res.json({ message: 'Successfully deleted' });
      });
    })
     .put(function(req,res){
        Support.findOne({_id:req.params.id},function(err,movie){

            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })




router.route('/mycategory')
    .get(function(req,res){
       MyCategory.find(function(err,movies){
        //MyCategory.find({user:req.params.id}).populate('category', 'name').exec(function(err, movies){

           if(err)
                res.send(err);
           res.json(movies);
       });
    })

    .post(function(req,res){
        var movie=new MyCategory(req.body);
        movie.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'User addedd'});
        });
    });
router.route('/mycategory_cust')
    .get(function(req,res){
      // MyCategory.find(function(err,movies){
        MyCategory.find().populate('category', 'name').populate('user', 'name telephone').exec(function(err, movies){
        
           if(err)
                res.send(err);
           res.json(movies);
       });
    });



    /*.post(function(req,res){
        var movie=new MyCategory(req.body);
        movie.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'User addedd'});
        });
    });*/

router.route('/mycategory/:id')
    .put(function(req,res){
        MyCategory.find({user:req.params.id},function(err,movie){

            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
    .post(function(req, res){
        MyCategory.findOne({username: req.params.id}, function(err, details){
            if(err){
                res.send(err)
            }
            else if(details){
                if(details.password === req.body.password){
                    details.password=null; 
                    res.send({status:0, message: details})
                }else
                {
                    res.send({status:1, message:'Invalid Username or Password'})
                }
            }
        })
    }).get(function(req,res){
        MyCategory.find({user:req.params.id}).populate('category', 'name').exec(function(err, movies){


           if(err)
                res.send(err);
           res.json(movies);
       });
    });


// end of my category


router.route('/myjobs')
    .get(function(req,res){
       MyJobs.find(function(err,movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    })

    .post(function(req,res){
        var movie=new MyJobs(req.body);
        movie.save(function(err){
            if(err)
                res.send(err);
            res.send({message:'User addedd'});
        });
    });
router.route('/myjobs_user/:id')
    .get(function(req,res){
        MyJobs.find({user:req.params.id}).populate('category', 'name').populate('customer', 'name telephone').exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    });

router.route('/myjobs_user_update/:id')
      .put(function(req,res){
        MyJobs.findOne({_id:req.params.id},function(err,movie){
            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    });


router.route('/myjobs_customer/:id')
    .get(function(req,res){
        MyJobs.find({customer:req.params.id}).populate('category', 'name').populate('user', 'name').exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    });
router.route('/myjobs_user_expense/:id')
    .get(function(req,res){
        MyJobs.find({user:req.params.id, amount:{$ne:'0'}}).populate('category', 'name').populate('user', 'name').exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    });
router.route('/myjobs_customer_expense/:id')
    .get(function(req,res){
        MyJobs.find({customer:req.params.id, amount:{$ne:0}}).populate('category', 'name').populate('user', 'name').exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    });

router.route('/company')
    .get(function(req,res){
       Company.find(function(err,movies){
           if(err)
           res.send(err);
           res.json(movies);
       });
    })

    .post(function(req,res){
        var movie=new Company(req.body);
        //movie.categories.push(req.body.category);
        movie.categories.push(req.body.category);
        //movie.keywords = movie.keywords+', '+ movie.name +', '+ movie.description; /*+movie.categories;*/
        movie.save(function(err){
          if(err){
            res.send(err); 
          }
          else{
            var list ='';
            var message = 'Dear '+req.body.name+' , your username is your mobile number and your password is ghana' ;
            if(req.body.mobile.length===10){
              list = '233'+ req.body.mobile.substr(1, 9);
            }else{
              list =req.body.mobile;
            }
            var lat = {
              username: req.body.mobile, 
              password: 'ghana', 
              name:req.body.name, 
              telephone: req.body.mobile, 
              type: 'Tech'
            }
            var movie=new Login(lat);
            movie.save(function(err){
              if(err){ 
                res.send(err); }
              else{
                requestify.get('http://server.txtmeghana.com/sendtxt/sms.php?username=tectrain&password=ttgh1234&to='+list +'&message='+message +'&name=KOFI247').then(function(response) {
                // Get the response body
                  response.getBody();
                    res.send(response.getBody())
                  });
              }
            })
      
                      res.send('sent');
            } //end of if
        });
    });

router.route('/company_location/:id')
    .get(function(req,res){
       //Company.find().exec(function(err,movies){
      Company.find({location:req.params.id}).exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    }); 


//router.route('/company')

router.route('/company_category/:id')
    .get(function(req,res){
       //Company.find().exec(function(err,movies){
      Company.find({location:req.params.id}).exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    });

router.route('/company_mobile/:id')
    .get(function(req, res){
      Company.find({mobile:req.params.id}).exec(function(err, movies){
          if(err)
            res.send(err); 
          res.json(movies);
    })
    });

router.route('/company/:id')
  .delete(function(req,res){
        Company.remove({
            _id: req.params.id
        }, function(err, movie) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    })
  .get(function(req,res){
       //Company.find().exec(function(err,movies){
      Company.find({_id:req.params.id}).exec(function(err, movies){
           if(err)
                res.send(err);
           res.json(movies);
       });
    })
      .put(function(req,res){
        Company.findOne({_id:req.params.id},function(err,movie){

            if(err)
                res.send(err);

           for(prop in req.body){
                movie[prop]=req.body[prop];
           }

            // save the movie
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
router.route('/company_search/:id')
    .get(function(req,res){
      // MyCategory.find(function(err,movies){
        Company.find({categories:req.params.id}).exec(function(err, movies){
        
           if(err)
                res.send(err);
           res.json(movies);
       });
    });

router.route('/companydetails/:id')
    .get(function(req,res){
      // MyCategory.find(function(err,movies){
        Company.find({mobile:req.params.id}).exec(function(err, movies){
        
           if(err)
                res.send(err);
           res.json(movies);
       });
    });

router.route('/company_search')
    .post(function(req,res){
      // MyCategory.find(function(err,movies){
        Company.find({ $and: [ { categories: req.body.category }, { location: req.body.location } ] }).exec(function(err, movies){
        //Company.find({categories:req.body.category, location:req.body.location}).exec(function(err, movies){
        
           if(err)
                res.send(err);
           res.json(movies);
       });
    });
router.route('/picture/:id')
.put(function(req, res){
     Company.findOne({mobile: req.params.id}, function(err, details){
            if(err){
                res.send(err)
            }
            else {
                details.pics.push(req.body.pics); 
                //details.pics = []; 
               // console.log(details);
                details.save(function(err) {
                if (err)
                {
                    res.send(err);
                }else{
                    res.json({ message: 'Movie updated!' });
                }
                    //console.log('saved');
                });
            }
      
})
   }).
  get(function(req, res){
      Company.findOne({mobile:req.params.id}).exec(function(err, movies){
        
           if(err)
            {    res.send(err);
            }else
              {
                res.json(movies);

              }
       });
  })

router.route('/picturedel/:id')
.put(function(req, res){
     Company.findOne({mobile: req.params.id}, function(err, details){
            if(err){
                res.send(err)
            }
            else {
                details.pics.splice(req.body.pics, 1); 
                details.save(function(err) {
                if (err)
                {
                    
                    res.send(err);
                }else{
                    
                    res.json({ message: 'Picture Removed' });
                }
                    //console.log('saved');
                });
            }
      
})
   });


module.exports=router;
