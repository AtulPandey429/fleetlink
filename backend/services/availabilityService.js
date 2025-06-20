const {Booking} = require('../models');
const calculateRideDuration = require('../utils/rideDuration');

const getAvailableVehicles = async ({ vehicles, fromPincode, toPincode, startTime }) => {
  const duration = calculateRideDuration(fromPincode, toPincode);
  const start = new Date(startTime);
  const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

  const availableVehicles = [];

  for (const vehicle of vehicles) {
    const conflict = await Booking.findOne({
      vehicleId: vehicle._id,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (!conflict) {
      availableVehicles.push({
        ...vehicle.toObject(),
        estimatedRideDurationHours: duration,
      });
    }
  }

  return availableVehicles;
};

module.exports = {getAvailableVehicles};
