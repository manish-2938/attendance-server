const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const adminLogin = require('./routes/adminLogin');
const adminSignup = require('./routes/adminSignup');
const attendance = require('./routes/attendanceRoutes');
const studentRoute = require('./routes/studentRoutes');
const eventRoute = require('./routes/eventRoutes');

const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:4200', // Allow frontend URL
    credentials: true,  // Allow credentials (cookies, HTTP authentication)
  }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/students', studentRoute);
app.use('/api/events', eventRoute);
app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api/', adminLogin);
app.use('/api/', adminSignup);
app.use('/api/attendance', attendance);




// Serve exported Excel files
app.use('/api/attendance/exports', express.static(path.join(__dirname, 'exports')));
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
