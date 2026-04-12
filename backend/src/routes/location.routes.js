const express = require('express');
const router = express.Router();

const { authOnly, adminOnly } = require('../middlewares/auth.middleware');

const locationController = require('../controllers/location.controller');
// Public routes
router.get('', locationController.getLocations);
router.get('/:id', locationController.getLocationById);

// Protected routes
router.post('/', authOnly, adminOnly, locationController.registerLocation);
router.put('/:id', authOnly, adminOnly, locationController.editLocation);
router.delete('/:id', authOnly, adminOnly, locationController.deleteLocation);


module.exports = router;