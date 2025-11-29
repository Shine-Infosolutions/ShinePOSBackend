const express = require('express');
const router = express.Router();
const controller = require('../../controllers/salesController/restaurantRegistrationController');
const { auth, authorize } = require('../../middleware/auth');

// Sales Person APIs
router.post('/create', auth, authorize('ADMIN'), controller.createRestaurantRegistration);
router.get('/all', auth, authorize('ADMIN'), controller.getAllRestaurantRegistrations);
router.get('/my-registrations', auth, authorize('SALES'), controller.getMyRegistrations);
router.get('/:id', auth, authorize('SALES'), controller.getRestaurantRegistrationById);
router.put('/update/:id', auth, authorize('SALES'), controller.updateRestaurantRegistration);
router.put('/submit/:id', auth, authorize('SALES'), controller.submitRestaurantRegistration);
router.delete('/delete/:id', auth, authorize('SALES'), controller.deleteRestaurantRegistration);

module.exports = router;