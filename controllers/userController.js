const session = require('express-session');
const User = require('../models/userModel.js');

const register = (req,res) => {
  const {username,password,email} = req.body;

  const user = new User({
    username,
    username_lowercase:username.toLowerCase(),
    password,
    email
  });

  user.save().then(doc=>{
    res.json({registered:true});
  }).catch(err=>{
    res.status(502).json({registered:false});
  })
};

checkIfUsernameExists = (req, res) => {
  const name = req.body.username.toLowerCase();
  User.find({username_lowercase:name}).then(docs=>{
    if(!docs || docs.length===0){
      res.json({exists:false});
    } else {
      res.json({exists:true});
    }
  })
};

module.exports={
  register,
  checkIfUsernameExists,
};
