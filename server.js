//call module
var express = require('express');
var app = express();
var path = require('path')
var http = require('http');
var multer = require('multer')
var mongoose = require('mongoose');
//var upload = multer({dest: './uploads'})
var routes = require('./routes/index')
var bodyParser = require('body-parser');
//var port = process.env.PORT|| 3000;

// Multer path define
// var storage = multer.diskStorage({
// 	destination: './uploads',
// 	filename: function(req,file,cb){
// 		cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname) );
// 	}
// });

var storage = multer.diskStorage({
	destination: (req,file,cb)=>{
		cb(null,'./uploads')
	},
	filename: (req,file,cb)=>{
		cb(null,file.originalname);
	}
})
// init upload

var upload = multer({
	storage: storage
});



app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
//connect Mongodb


const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://admin:test@ds147118.mlab.com:47118/neelcrud', (err, client) => {
  if (err) return console.log(err)
  db = client.db('neelcrud') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


//routes
app.get('/', (req,res)=>{
	res.render('index')
})
app.post('/posts',  upload.single('post_iamge'), (req,res)=>{
	
	  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
	console.log(req.body)
	console.log(req.file)
	//console.log(req.file.originalname)
    res.render('index.ejs')
  })
	  
})

app.get('/blog',(req,res)=>{
	  db.collection('posts').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('blog',{posts: result})
  })
})
