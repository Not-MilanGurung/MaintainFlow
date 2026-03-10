const express = require('express');
const router = express.Router();

const requestsController = require('../controllers/requests.controller');

router.get('', requestsController.getAllRequests);
router.get('/:id', requestsController.getRequestById);
router.post('', requestsController.createRequest);
router.delete('/:id', requestsController.deletedRequest);
router.put('/:id', requestsController.updateRequest);

module.exports = router;