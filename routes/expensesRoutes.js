const express = require('express');
const expensesController = require('../controllers/expensesController');

const router = express.Router();

router.get('/checkExpense/:id', expensesController.checkExpense);
router.get('/get/:id', expensesController.get);

router.post('/add', expensesController.add);
router.post('/update/:id', expensesController.update);
router.post('/load', expensesController.load);
router.post('/piechart', expensesController.piechart);

router.delete('/:id',expensesController.deleteExp);

module.exports = router;
