const session = require('express-session');
const User = require('../models/userModel.js');

const register = (req, res) => {
  let sess = req.session;
  const {username,password,email} = req.body;

  const user = new User({
    username,
    username_lowercase:username.toLowerCase(),
    password,
    email
  });

  user.save().then(doc=>{
    sess.user = username;
    res.json({registered:true});
  }).catch(err=>{
    res.status(502).json({registered:false});
  })
};

const checkIfUsernameExists = (req, res) => {
  const name = req.body.username.toLowerCase();
  User.find({username_lowercase:name}).then(docs=>{
    if(!docs || docs.length===0){
      res.json({exists:false});
    } else {
      res.json({exists:true});
    }
  })
};

const checkIfEmailIsUsed = (req, res) => {
  const { email } = req.body;
  User.find({email}).then(docs=>{
    if(!docs || docs.length===0){
      res.json({exists:false});
    } else {
      res.json({exists:true});
    }
  })
};

const checkLogInData = (req, res) => {
  let sess = req.session;

  const data = {
    username_lowercase:req.body.username.toLowerCase(),
    password:req.body.password
  };

  User.findOne(data).then(doc=>{
    if(doc)
    {
      sess.user = req.body.username;
      res.json({mssg:"ok"});
    } else {
      User.findOne({username_lowercase:req.body.username.toLowerCase()}).then(doc=>{
        if(doc)
        {
          res.json({mssg:"password"});
        }
        else
        {
          res.json({mssg:"username"});
        }

      }).catch(err=>console.log(err));
    }
  }).catch(err=>console.log(err));
};

const isLoggedIn = (req, res) => {
  let sess = req.session;
  if(sess.user && sess.user!=="")
  {
    res.json({isLogged:true});
  }
  else{
    res.json({isLogged:false});
  }
};

const logOut = (req, res) => {
  let sess = req.session;
  sess.user = null;
  res.json({mssg:"logged out"});
};

const userData = (req, res) => {
  let sess = req.session;

  if(!sess.user || sess.user==="")
  {
    res.status(502);
  } else {

    User.findOne({username_lowercase:sess.user.toLowerCase()}).then(doc=>{

      let d = doc.createdAt.getDate();
      let m = doc.createdAt.getMonth()+1;
      let y = doc.createdAt.getFullYear();

      if(parseInt(d)<10)
      {
        d=`0${d}`;
      }
      if(parseInt(m)<10)
      {
        m=`0${m}`;
      }

      const datestr = `${d}-${m}-${y}`;
      res.json({username:sess.user, date:datestr});
    }).catch(err=>{
      res.status(502);
    })
  }
};


module.exports={
  register,
  checkIfUsernameExists,
  checkIfEmailIsUsed,
  checkLogInData,
  isLoggedIn,
  logOut,
  userData
};
