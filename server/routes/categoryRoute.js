const express = require('express');

const {
    registerCategory,
    viewCategory
} = require('../controller/categoryController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerCategory',
    verifyToken,
    registerCategory
);

router.get(
    '/viewCategory',
    verifyToken,
    viewCategory
);

module.exports = router;