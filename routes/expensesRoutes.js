const express = require('express');
const expensesController = require('../controllers/expensesController');

const router = express.Router();

router.post('/add', expensesController.add);

module.exports = router;
