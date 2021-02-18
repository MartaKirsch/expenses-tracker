const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);

router.post('/checkIfUsernameExists', userController.checkIfUsernameExists);

router.post('/checkIfEmailIsUsed', userController.checkIfEmailIsUsed);

router.post('/checkLogInData', userController.checkLogInData);

module.exports = router;
