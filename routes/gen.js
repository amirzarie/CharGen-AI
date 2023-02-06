const express = require('express');
const router = express.Router();
const genCtrl = require('../controllers/gen');

router.post('/', genCtrl.generate);
router.get('/:id', genCtrl.show);
router.post('/:id', genCtrl.saveReview);
router.post('/:id/save', genCtrl.saveImage);
router.post('/:id/deleteImage', genCtrl.deleteChar);
router.get('/:id/deleteReview', genCtrl.deleteReview);

module.exports = router;