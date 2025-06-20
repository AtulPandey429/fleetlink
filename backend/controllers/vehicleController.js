const {Vehicle} = require('../models');
const { vehiclesService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createVehicle = catchAsync(async (req, res) => {
  const { name, capacityKg, tyres } = req.body;
  if (!name || isNaN(capacityKg) || isNaN(tyres)) {
  return res.status(400).json({ message: 'Invalid or missing fields' });
}

  const vehicle = await Vehicle.create({ name, capacityKg, tyres });
  res.status(201).json(vehicle);
});

const getAvailableVehicles = catchAsync(async (req, res) => {
  const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

  if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
    return res.status(400).json({ message: 'Missing required query parameters' });
  }

  const start = new Date(startTime);
  if (isNaN(start)) return res.status(400).json({ message: 'Invalid startTime format' });

  const vehicles = await Vehicle.find({ capacityKg: { $gte: Number(capacityRequired) } });

  const availableVehicles = await vehiclesService.getAvailableVehicles({
    vehicles,
    fromPincode,
    toPincode,
    startTime,
  });

  res.status(200).json(availableVehicles);
});

module.exports = {
  createVehicle,
  getAvailableVehicles,
};