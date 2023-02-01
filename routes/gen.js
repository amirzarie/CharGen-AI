const express = require('express');
const router = express.Router();
const genCtrl = require('../controllers/gen');

router.post('/', genCtrl.generate);
router.get('/:id', genCtrl.show);
router.post('/:id', genCtrl.saveReview);

module.exports = router;