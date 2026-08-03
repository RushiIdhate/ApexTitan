const express = require('express');
const { registerEmployee, viewEmployee } = require('../controller/employeeController.js');
const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post('/registerEmployee', verifyToken, registerEmployee);
router.get('/viewEmployee', verifyToken, viewEmployee);

module.exports = router;