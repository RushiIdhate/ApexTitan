const express = require('express');
const { registerEmployee, viewEmployee, deleteEmployee } = require('../controller/employeeController.js');
const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post('/registerEmployee', verifyToken, registerEmployee);
router.get('/viewEmployee', verifyToken, viewEmployee);
router.delete('/deleteEmployee/:id', verifyToken, deleteEmployee);

module.exports = router;