const express = require('express');

const {
    registerProduct,
    viewProduct
} = require('../controller/productController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerProduct',
    verifyToken,
    registerProduct
);

router.get(
    '/viewProduct',
    verifyToken,
    viewProduct
);

module.exports = router;