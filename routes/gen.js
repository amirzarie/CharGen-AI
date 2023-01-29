const express = require('express');
const router = express.Router();
const genCtrl = require('../controllers/gen');

router.post('/', genCtrl.generate);

module.exports = router;