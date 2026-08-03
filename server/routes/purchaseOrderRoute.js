const express = require('express');

const {
    registerPurchaseOrder,
    viewPurchaseOrder,
    approvePurchaseOrder,
    cancelPurchaseOrder
} = require('../controller/purchaseOrderController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerPurchaseOrder',
    verifyToken,
    registerPurchaseOrder
);

router.get(
    '/viewPurchaseOrder',
    verifyToken,
    viewPurchaseOrder
);

router.put(
    '/approvePurchaseOrder',
    verifyToken,
    approvePurchaseOrder
);

router.put(
    '/cancelPurchaseOrder',
    verifyToken,
    cancelPurchaseOrder
);

module.exports = router;