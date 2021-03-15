require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes.js');
const expensesRoutes = require('./routes/expensesRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');
const MongoStore = require('connect-mongo');

const app = express();

//mongoose findOneAndUpdate depracation
mongoose.set('useFindAndModify', false);

//heroku stuff - port/db uri selection
let port = process.env.PORT;
let dbURI = process.env.DBURI;

if (port == null || port == "") {
  port = 5000;
}
else
{
  dbURI = process.env.DBURI;
}

dbURI = process.env.DBURI;

//db connection
mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then((result)=>{console.log('connected to db');app.listen(port);console.log(`listening to port: ${port}`);})
  .catch((err)=>console.log('there is an error: '+err));


// app.use(express.static('client/build'));

//use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session
// app.use(session({secret: 'ssshhhhh', resave:true, saveUninitialized: false}));
app.use(session({
  secret: 'pandeuek',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl: dbURI,
    clear_interval: 3600,
    ttl:60*60*24})
}));

//routes
app.use('/users', userRoutes);
app.use('/expenses',expensesRoutes);
app.use('/review',reviewRoutes);

//404
app.use((req,res)=>{
  res.send('An error occured');
})
