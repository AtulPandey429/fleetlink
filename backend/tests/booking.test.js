const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

let vehicleId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});

beforeEach(async () => {
  await Vehicle.deleteMany({});
  await Booking.deleteMany({});

  const vehicle = await Vehicle.create({ name: 'Mini Truck', capacityKg: 1000, tyres: 6 });
  vehicleId = vehicle._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/bookings', () => {
  it('should create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        vehicleId,
        fromPincode: '123456',
        toPincode: '123460',
        startTime: new Date().toISOString(),
        customerId: 'cust123',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicleId).toBe(vehicleId.toString());
  });

  it('should return 409 for overlapping booking', async () => {
    const payload = {
      vehicleId,
      fromPincode: '123456',
      toPincode: '123460',
      startTime: new Date().toISOString(),
      customerId: 'cust123',
    };

    await request(app).post('/api/bookings').send(payload); // First booking
    const res = await request(app).post('/api/bookings').send(payload); // Overlapping

    expect(res.statusCode).toBe(409);
  });
});
