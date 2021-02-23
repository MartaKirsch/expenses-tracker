const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  "username": {
    type: String,
    required: true
  },
  "type": {
    type: String,
    required: true
  },
  "date": {
    type: Date,
    required: true
  },
  "shop": {
    type: String,
    required: true
  },
  "title": {
    type: String,
    required: true
  },
  price:{
    type:Number,
    required:true
  }
});

//create model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
