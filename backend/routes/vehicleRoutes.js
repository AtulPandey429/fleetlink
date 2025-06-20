
const express = require('express');
const router = express.Router();
const {vehicleController} = require('../controllers');

router.get('/available', vehicleController.getAvailableVehicles);
router.post('/', vehicleController.createVehicle);

module.exports = router;
