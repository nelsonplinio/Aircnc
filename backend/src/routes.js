const express = require("express");
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SpotController = require("./controllers/SpotController");
const SessionController = require("./controllers/SessionController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

// Sessions
routes.post('/sessions', SessionController.store);

// Spots'
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

// Dashboard
routes.get('/dashboard', DashboardController.show)

// Booking
routes.post('/spots/:spot_id/bookings', BookingController.store)
routes.post('/booking/:booking_id/approvals', ApprovalController.store);
routes.post('/booking/:booking_id/rejections', RejectionController.store);
module.exports = routes;
