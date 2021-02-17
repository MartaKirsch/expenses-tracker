const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  "username": {
    type: String,
    required: true
  },
  "username_lowercase": {
    type: String,
    required: true
  },
  "password": {
    type: String,
    required: true
  },
  "email": {
    type: String,
    required: true
  }
});

//create model
const User = mongoose.model('User', userSchema);

module.exports = User;
