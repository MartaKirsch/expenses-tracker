require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes.js');
const expensesRoutes = require('./routes/expensesRoutes.js');

const app = express();

//heroku stuff - port/db uri selection
let port = process.env.PORT;
let dbURI = process.env.DBURI;

if (port == null || port == "") {
  port = 5000;
}
else
{
  dbURI = process.env.MONGODB_URI;
}

dbURI = process.env.DBURI;

//db connection
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then((result)=>{console.log('connected to db');app.listen(port);})
  .catch((err)=>console.log('there is an error: '+err));

//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session
// app.use(session({secret: 'ssshhhhh', resave:true, saveUninitialized: false}));
app.set('trust proxy', 1);

app.use(session({
cookie:{
    secure: true,
    maxAge:60000
       },
store: new RedisStore(),
secret: 'secret',
saveUninitialized: true,
resave: false
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no')) //handle error
}

//routes
app.use('/users', userRoutes);
app.use('/expenses',expensesRoutes);

//404
app.use((req,res)=>{
  res.status(404).send("sth is wrong");
})
