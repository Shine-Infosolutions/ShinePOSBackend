const express = require('express');
const router = express.Router();
const salesPersonController = require('../../controllers/salesController/salesPersonController');
const { auth, authorize } = require('../../middleware/auth');

// Sales Person Self Access
router.get('/my-profile', auth, authorize('SALES'), salesPersonController.getMyProfile);

// Get SalesPerson by User ID (specific route first)
router.get('/user/:userId', auth, authorize('ADMIN'), salesPersonController.getSalesPersonByUserId);

// Admin Only APIs
router.post('/', auth, authorize('ADMIN'), salesPersonController.createSalesPerson);
router.get('/', auth, authorize('ADMIN'), salesPersonController.getAllSalesPersons);
router.put('/:id', auth, authorize('ADMIN'), salesPersonController.updateSalesPerson);
router.delete('/:id', auth, authorize('ADMIN'), salesPersonController.deleteSalesPerson);

// Get SalesPerson by ID (general route last)
router.get('/:id', auth, authorize('ADMIN'), salesPersonController.getSalesPersonById);

module.exports = router;