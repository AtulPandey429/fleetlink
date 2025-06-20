const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Vehicle = require('../models/Vehicle');
require('dotenv').config();


beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
});

afterEach(async () => {
  await Vehicle.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/vehicles', () => {
  it('should create a new vehicle', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({ name: 'Tata Ace', capacityKg: 800, tyres: 4 });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Tata Ace');
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .send({ name: 'Missing Capacity', tyres: 4 });

    expect(res.statusCode).toBe(400);
  });
});
