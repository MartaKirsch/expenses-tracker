const session = require('express-session');
const Review = require('../models/reviewModel.js');

const add = (req,res) => {
  let sess = req.session;
  let username = sess.user.toLowerCase();
  let {body} = req.body;

  let review = new Review({username,body});
  review.save().then(()=>{
    res.json({saved:true})
  })
  .catch(err => {
    res.status(502).json({saved:false});
  });
};

const count = (req,res) => {
  let sess = req.session;
  let username = sess.user.toLowerCase();

  Review.find({username}).then(docs=>{
    res.json({length:docs.length});
  })
  .catch(err => {
    res.status(502).json({found:false});
  });
};


module.exports={
  add,
  count
};
