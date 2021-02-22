const session = require('express-session');
const Expense = require('../models/expenseModel.js');

const add = (req, res) => {
  let sess = req.session;

  const {date,title,shop,type} = req.body;

  const expense = new Expense({
    username: sess.user.toLowerCase(),
    date,
    title,
    shop,
    type
  });

  expense.save().then(doc=>{
    res.json({saved:true});
  }).catch(err=>{
    res.status(502).json({saved:false});
  });
};


module.exports={
  add
};
