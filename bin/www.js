/**
 * Created by Sandeep on 01/06/14.
 */




var app = require('../app');
var multer  =   require('multer'); 
fs = require('fs');


app.post('/api/photo', function(req, res){
	var loc = '';
	var storage = multer.diskStorage({
	destination: function(req, file, callback){
		
		callback(null, './images');
	}, 
	filename: function(req,file, callback){
			// console.log(file);
		loc = file.originalname
		callback(null, loc);
	}
}); 




var upload = multer({storage: storage}).single('file');
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return res.send(err);
		}
		res.send(loc);
		//console.log('File is uploaded');
	})
});


app.post('/api/evidencefile', function(req, res){
	var loc = '';
	var storage = multer.diskStorage({
	destination: function(req, file, callback){
		
		callback(null, './images');
	}, 
	filename: function(req,file, callback){
		//console.log(file);
		loc = 'Ev'+file.fieldname +'-'+ Date.now()+'.'+file.originalname.substr(-3)
		callback(null, loc);
	}
}); 




var upload = multer({storage: storage}).single('file');
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return res.send(err);
		}
		res.send(loc);
		//console.log('File is uploaded');
	})
});


app.post('/api/statusfile', function(req, res){
	var loc = '';
	var storage = multer.diskStorage({
	destination: function(req, file, callback){
		
		callback(null, './images');
	}, 
	filename: function(req,file, callback){
		//console.log(file);
		loc = 'Stat'+file.fieldname +'-'+ Date.now()+'.'+file.originalname.substr(-3)
		callback(null, loc);
	}
}); 




var upload = multer({storage: storage}).single('file');
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return res.send(err);
		}
		res.send(loc);
		//console.log('File is uploaded');
	})
});



app.get('/api/photo', function(req, res){
	res.send('alert');
}); 

app.post('/api/images/:id', function(req, res){
	//console.log(req.params.id);
	var img = fs.readFileSync('./images/'+req.body.id);
     //res.writeHead(200, {'Content-Type': 'image/gif' });
     res.end(img, 'binary');

})


app.set('port', process.env.PORT || 7015);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
