require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

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
app.use(session({secret: 'ssshhhhh', resave:true, saveUninitialized: false}));
