const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

router.get('/travels', travelController.getAllTravels);

router.get('/travels/:id', travelController.getTravelById);

router.post('/travels', travelController.createTravel);

router.put('/travels/:id', travelController.updateTravel);

router.delete('/travels/:id', travelController.deleteTravel);

module.exports = router;
