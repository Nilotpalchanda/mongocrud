//call module
var express = require('express');
var app = express();
var routes = require('./routes/index')
const bodyParser= require('body-parser')
//var port = process.env.PORT|| 3000;
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine','ejs');

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
app.post('/posts', (req,res)=>{
	  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
	console.log(req.body)
    res.render('index.ejs',)
  })
})

app.get('/blog',(req,res)=>{
	  db.collection('posts').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('blog',{posts: result})
  })
})
