const express = require('express');

const {
    registerLeave,
    viewLeave,
    approveLeave,
    rejectLeave,
    cancelLeave
} = require('../controller/leaveController.js');

const verifyToken = require('../middlewares/verifyToken.js');

const router = express.Router();

router.post(
    '/registerLeave',
    verifyToken,
    registerLeave
);

router.get(
    '/viewLeave',
    verifyToken,
    viewLeave
);

router.put(
    '/approveLeave',
    verifyToken,
    approveLeave
);

router.put(
    '/rejectLeave',
    verifyToken,
    rejectLeave
);

router.put(
    '/cancelLeave',
    verifyToken,
    cancelLeave
);

module.exports = router;