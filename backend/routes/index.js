const express = require('express');
const router = express.Router();

const vehicleRoutes = require('./vehicleRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/vehicles', vehicleRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;
