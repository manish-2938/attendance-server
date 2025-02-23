const Attendance = require('../models/attendance');
const { generateAttendanceExcel } = require('../utils/excelService');

exports.exportAttendance = async (req, res) => {
    try {
        const { eventId } = req.params;
        console.log("Exporting attendance for Event ID:", eventId);

        const attendanceRecords = await Attendance.find({ eventId });

        if (!attendanceRecords.length) {
            return res.status(404).json({ message: 'No attendance records found' });
        }

        console.log("Attendance records fetched:", attendanceRecords);

        const attendanceData = attendanceRecords.map(record => ({
            'First Name': record.firstName,
            'Last Name': record.lastName,
            'Roll Number': record.rollNumber,
            'Branch': record.department,
            'Timestamp': record.timestamp.toLocaleString(),
        }));

        console.log("Formatted attendance data:", attendanceData);

        // Generate Excel file buffer
        const excelBuffer = await generateAttendanceExcel(attendanceData);

        if (!excelBuffer) {
            console.error("Excel buffer generation failed");
            return res.status(500).json({ message: "Failed to generate Excel file" });
        }

        console.log("Excel buffer generated successfully");

        res.setHeader('Content-Disposition', `attachment; filename=attendance_${eventId}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.send(excelBuffer);
    } catch (error) {
        console.error("Error exporting attendance:", error);
        res.status(500).json({ message: 'Error exporting attendance', error: error.message });
    }
};
