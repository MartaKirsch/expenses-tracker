const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  "username": {
    type: String,
    required: true
  },
  "body": {
    type: String,
    required: true
  },
  "createdAt": {
    type: Date,
    default: Date.now
  },
});

//create model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
