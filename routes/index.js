const express = require('express');
const router = express.Router();
const charsCtrl = require('../controllers/chars');

// Home page.
router.get('/', charsCtrl.index);

module.exports = router;