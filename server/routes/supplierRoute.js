const express = require('express');

const {
    registerSupplier,
    viewSupplier
} = require('../controller/supplierController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerSupplier',
    verifyToken,
    registerSupplier
);

router.get(
    '/viewSupplier',
    verifyToken,
    viewSupplier
);

module.exports = router;