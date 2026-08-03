const express = require('express');

const {
    registerInventory,
    viewInventory,
    updateInventory
} = require('../controller/inventoryController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerInventory',
    verifyToken,
    registerInventory
);

router.get(
    '/viewInventory',
    verifyToken,
    viewInventory
);

router.put(
    '/updateInventory',
    verifyToken,
    updateInventory
);

module.exports = router;