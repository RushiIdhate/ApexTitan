const express = require('express');
const { registerCustomer, viewCustomer } = require('../controller/customerController.js');
const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post('/registerCustomer', verifyToken, registerCustomer);
router.get('/viewCustomer', verifyToken, viewCustomer);

module.exports = router;