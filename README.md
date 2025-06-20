# 🚀 FleetLink – Modern Vehicle Booking System

FleetLink is a full-stack vehicle booking platform that simplifies fleet management with intuitive booking, cancellation, and reporting features.

## 🌟 Key Features

### 🚗 Vehicle Management
- Add vehicles with detailed specifications (capacity, tyre count, etc.)
- Real-time availability tracking
- Comprehensive vehicle database

### 📅 Booking System
- Intuitive search by pincode, capacity, and date range
- Instant booking confirmation
- One-click cancellations with confirmation dialogs
- Cancel bookings via DELETE API with confirmation modal

### 📊 Reporting Tools
- Export bookings to PDF/CSV with custom date filters
- Dashboard-style analytics
- Responsive design for all devices

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React (Vite) | Core framework |
| Axios | API communication |
| CSS Modules | Styling |
| jsPDF/xlsx | Export functionality |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | API framework |
| MongoDB | Database |
| Mongoose | ODM |

### Deployment
- Docker containerization
- Render.com hosting

## 🔗 Live Demos
- **Frontend**: [https://fleetlink-frontend.onrender.com](https://fleetlink-frontend.onrender.com)
- **Backend API**: [https://fleetlink-8yg2.onrender.com/api](https://fleetlink-8yg2.onrender.com/api)

## 🏗️ Project Structure

```
fleetlink/
├── backend/                     # Node.js + Express API
│   ├── controllers/             # Business logic controllers (e.g., bookingController.js, vehicleController.js)
│   ├── models/                  # Mongoose schemas (e.g., Booking.js, Vehicle.js)
│   ├── routes/                  # API routes (e.g., bookingRoutes.js, vehicleRoutes.js)
│   ├── services/                # Reusable logic (e.g., availabilityService.js)
│   ├── tests/                   # API test files (e.g., booking.test.js, vehicle.test.js)
│   ├── utils/                   # Utility functions (e.g., rideDuration.js)
│   ├── config/                  # DB connection and config setup
│   ├── Dockerfile               # Docker config for backend
│   ├── .env                     # Environment variables (e.g., MONGODB_URL)
│   ├── app.js                   # Express app setup
│   └── server.js                # App entry point
│
├── frontend/                    # React frontend using Vite
│   ├── public/                  # Static public files
│   ├── src/
│   │   ├── components/          # Reusable UI (e.g., VehicleCard.jsx)
│   │   ├── pages/               # Page views (e.g., AddVehicle.jsx, SearchAndBook.jsx, MyBookings.jsx)
│   │   ├── services/            # API helper (e.g., api.js)
│   │   ├── App.jsx              # Routes and layout
│   │   └── index.js             # Main entry file
│   ├── Dockerfile               # Docker config for frontend (build + nginx)
│   ├── .env                     # Environment file (e.g., VITE_API_URL)
│   └── package.json
│
├── docker-compose.yml          # Docker orchestration for local setup
├── README.md                   # Project overview and instructions
└── .gitignore

```

## 🚀 Deployment Guide

### Render.com Setup

1. **Backend Service**
   - Select "New Web Service" in Render dashboard
   - Configure:
     - Root directory: `backend`
     - Environment: Docker
     - Port: `5000`
     - Environment variables:
       ```
       MONGODB_URL=your_connection_string
       NODE_ENV=production
       ```

2. **Frontend Service**
   - Select "New Web Service"
   - Configure:
     - Root directory: `frontend`
     - Environment: Docker
     - Port: `80`
     - Add `.env` file:
       ```
       VITE_API_URL=https://fleetlink-backend.onrender.com/api
       ```

## 💻 Local Development

### With Docker
```bash
docker-compose up --build
```
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

### Without Docker
```bash
# Backend
cd backend
npm install
npm start

# Frontend (in separate terminal)
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

### Key Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/vehicles` | GET | List all vehicles |
| `/api/vehicles` | POST | Add new vehicle |
| `/api/bookings` | GET | Get all bookings |
| `/api/bookings` | POST | Create new booking |
| `/api/bookings/:id` | DELETE | Cancel a booking by ID |


## 📦 Dependencies

### Frontend
```bash
npm install react-router-dom axios jsPDF xlsx file-saver
```

### Backend
```bash
npm install express mongoose cors dotenv
```

## ✨ Contributors
- [Atul Pandey](https://github.com/yourprofile) - Project Author

## 📄 License
MIT © 2023 Atul Pandey
```



