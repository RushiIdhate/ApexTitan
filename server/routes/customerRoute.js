const express = require('express');
const { registerCustomer, viewCustomer, deleteCustomer } = require('../controller/customerController.js');
const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post('/registerCustomer', verifyToken, registerCustomer);
router.get('/viewCustomer', verifyToken, viewCustomer);
router.delete('/deleteCustomer/:id', verifyToken, deleteCustomer);

module.exports = router;