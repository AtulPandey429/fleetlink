const { Parser } = require('json2csv');
const { Booking, Vehicle } = require('../models');
const catchAsync = require('../utils/catchAsync');
const calculateRideDuration = require('../utils/rideDuration');

const createBooking = catchAsync(async (req, res) => {
  const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

  if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

  const start = new Date(startTime);
  if (isNaN(start)) return res.status(400).json({ message: 'Invalid startTime' });

  const duration = calculateRideDuration(fromPincode, toPincode);
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

  const conflict = await Booking.findOne({
    vehicleId,
    $or: [
      {
        startTime: { $lt: end },
        endTime: { $gt: start }
      }
    ]
  });

  if (conflict) {
    return res.status(409).json({ message: 'Vehicle already booked during that time' });
  }

  const booking = await Booking.create({
    vehicleId,
    customerId,
    fromPincode,
    toPincode,
    startTime: start,
    endTime: end,
  });

  res.status(201).json(booking);
});
const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find().populate('vehicleId');
  res.status(200).json(bookings);
});
// Export bookings to CSV
const exportBookingsCSV = catchAsync(async (req, res) => {
  const bookings = await Booking.find().populate('vehicleId');

  const fields = ['vehicleId.name', 'fromPincode', 'toPincode', 'startTime'];
  const opts = { fields };

  const flatBookings = bookings.map(b => ({
    'vehicleId.name': b.vehicleId?.name,
    fromPincode: b.fromPincode,
    toPincode: b.toPincode,
    startTime: new Date(b.startTime).toLocaleString(),
  }));

  const parser = new Parser(opts);
  const csv = parser.parse(flatBookings);

  res.header('Content-Type', 'text/csv');
  res.attachment('bookings.csv');
  return res.status(200).send(csv);
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Booking.findByIdAndDelete(id);
  res.status(200).json({ message: 'Booking cancelled successfully' });
});
module.exports = {
  createBooking,
  getAllBookings,
  cancelBooking,
  exportBookingsCSV
};