import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Vehicle APIs
export const addVehicle = (data) => API.post('/vehicles', data);
export const getAvailableVehicles = (params) => API.get('/vehicles/available', { params });

// Booking API
export const bookVehicle = (data) => API.post('/bookings', data);
