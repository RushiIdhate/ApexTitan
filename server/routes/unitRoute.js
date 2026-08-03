const express = require('express');

const {
    registerUnit,
    viewUnit
} = require('../controller/unitController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerUnit',
    verifyToken,
    registerUnit
);

router.get(
    '/viewUnit',
    verifyToken,
    viewUnit
);

module.exports = router;