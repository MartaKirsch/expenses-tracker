const session = require('express-session');
const Expense = require('../models/expenseModel.js');

const add = (req, res) => {
  let sess = req.session;

  const {date,title,shop,type,price} = req.body;

  const expense = new Expense({
    username: sess.user.toLowerCase(),
    date,
    title,
    shop,
    type,
    price
  });

  expense.save().then(doc=>{
    res.json({saved:true});
  }).catch(err=>{
    res.status(502).json({saved:false});
  });
};

const load = (req, res) => {
  let sess = req.session;

  const {date,type,phrase} = req.body;
  const filters = {};

  if(type && type!=="")
  {filters.type=type;}

  if(phrase && phrase!=="")
  {filters.title={ "$regex": new RegExp(phrase), "$options": 'i' };}

  console.log(filters,phrase);

  if(!date){
    Expense.find({username:sess.user.toLowerCase()}).sort({date:-1}).then(docs=>{
      res.json(docs);
    }).catch(err=>{
      res.status(502).json({loaded:false});
    });
  }

  else{
    Expense.find({username:sess.user.toLowerCase(), ...filters}).sort({date}).then(docs=>{
      console.log(docs);
      res.json(docs);
    }).catch(err=>{
      res.status(502).json({loaded:false});
    });
  }

};


module.exports={
  add,
  load
};
