const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');
const { generateAttendanceExcel } = require('../utils/excelService');

// Mark attendance when a student scans QR
router.post('/mark', async (req, res) => {
    try {
        console.log('Received QR Scan Data:', req.body);
        const { eventId, firstName, lastName, rollNumber, department } = req.body;

        if (!eventId || !firstName || !lastName || !rollNumber || !department) {
            return res.status(400).json({ message: 'Missing eventId or studentId' });
        }

        // Check if attendance is already recorded
        const existingRecord = await Attendance.findOne({ eventId, firstName, lastName, rollNumber, department });
        if (existingRecord) {
            return res.status(400).json({ message: 'Attendance already marked' });
        }

        // Create a new attendance entry
        const attendance = new Attendance({ eventId, firstName, lastName, rollNumber, department, timestamp: new Date() });
        await attendance.save();

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error marking attendance', error: error.message });
    }
});

// Export attendance records to an Excel file
router.get('/export/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log("Exporting attendance for Event ID:", eventId);

        // Fetch attendance data
        const attendanceRecords = await Attendance.find({ eventId });
        console.log("Fetched Attendance Records:", attendanceRecords);

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        // Format the data for Excel
        const attendanceData = attendanceRecords.map(record => ({
            'First Name': record.firstName,
            'Last Name' : record.lastName,
            'Roll Number': record.rollNumber,
            'Branch': record.department,
            'Timestamp': record.timestamp ? record.timestamp.toLocaleString() : 'N/A',
        }));

        console.log("Formatted Data for Excel:", attendanceData);

        // Generate Excel file buffer
        const excelBuffer = await generateAttendanceExcel(attendanceData);

        if (!excelBuffer) {
            console.error("Excel buffer generation failed");
            return res.status(500).json({ message: "Failed to generate Excel file" });
        }

        console.log("Excel file generated successfully");

        // Set headers for download
        res.setHeader('Content-Disposition', `attachment; filename=attendance_${eventId}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send buffer as response
        res.send(excelBuffer);
    } catch (error) {
        console.error("Error exporting attendance:", error);
        res.status(500).json({ message: 'Error exporting attendance', error: error.message });
    }
});

module.exports = router;
