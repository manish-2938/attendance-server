const ExcelJS = require('exceljs');

async function generateAttendanceExcel(data) {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Attendance');

        // Define headers
        worksheet.columns = [
            { header: 'First Name', key: 'First Name', width: 20 },
            { header: 'Last Name', key: 'Last Name', width: 20 },
            { header: 'Roll Number', key: 'Roll Number', width: 15 },
            { header: 'Branch', key: 'Branch', width: 20 },
            { header: 'Timestamp', key: 'Timestamp', width: 25 }
        ];

        if (!data || data.length === 0) {
            console.error("No data received for Excel generation");
            return null;
        }

        // Add rows
        worksheet.addRows(data);

        // Generate buffer
        return await workbook.xlsx.writeBuffer();
    } catch (error) {
        console.error("Error generating Excel:", error);
        return null;
    }
}

module.exports = { generateAttendanceExcel };
