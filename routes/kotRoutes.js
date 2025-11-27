const express = require('express');
const kotController = require('../controllers/kotController');
const KOT = require('../models/KOT');

const router = express.Router();

router.post('/create', kotController.createKOT);
router.get('/all', kotController.getAllKOTs);

router.patch('/:kotId/item-statuses', kotController.updateItemStatuses);

router.get('/:id', kotController.getKOTById);
router.patch('/:id/status', kotController.updateKOTStatus);

module.exports = router;
