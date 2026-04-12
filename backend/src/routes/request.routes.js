const express = require('express');
const router = express.Router();

const { authOnly, adminOnly } = require('../middlewares/auth.middleware');

const requestController = require('../controllers/request.controller');

// Public routes
router.get('', requestController.getRequests);
router.get('/:id', requestController.getRequestById);

// Protected routes
router.post('/', authOnly, requestController.createRequest);
router.put('/:id', authOnly, requestController.updateRequest);
router.delete('/:id', authOnly, requestController.deleteRequest);


module.exports = router;