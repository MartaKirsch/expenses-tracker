const express = require('express');
const reviewController = require('../controllers/reviewController.js');

const router = express.Router();

router.get('/count', reviewController.count);

router.post('', reviewController.add)

module.exports = router;
