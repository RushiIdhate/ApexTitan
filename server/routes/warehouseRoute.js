const express = require('express');

const {
    registerWarehouse,
    viewWarehouse
} = require('../controller/warehouseController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerWarehouse',
    verifyToken,
    registerWarehouse
);

router.get(
    '/viewWarehouse',
    verifyToken,
    viewWarehouse
);

module.exports = router;