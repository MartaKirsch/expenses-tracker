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
    }
    User.findOne({username_lowercase:req.body.username.toLowerCase()}).then(doc=>{
      if(doc)
      {
        res.json({mssg:"password"});
      }
      res.json({mssg:"username"})
    }).catch(err=>res.json({mssg:"error"}));

  }).catch(err=>res.json({mssg:"error"}));
};

const isLoggedIn = (req, res) => {
  let sess = req.session;
  if(sess.user && sess.user!=="")
  {
    res.json({isLogged:true});
  }
  res.json({isLogged:false});
};

const logOut = (req, res) => {
  let sess = req.session;
  sess.user = null;
  res.json({mssg:"logged out"});
};

module.exports={
  register,
  checkIfUsernameExists,
  checkIfEmailIsUsed,
  checkLogInData,
  isLoggedIn,
  logOut
};
