const express = require('express');
const router = express.Router();
const {bookingController} = require('../controllers');

router.get('/', bookingController.getAllBookings); 
router.get('/csv', bookingController.exportBookingsCSV);

router.post('/', bookingController.createBooking);
router.delete('/:id', bookingController.cancelBooking);


module.exports = router;
