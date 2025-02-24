const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a student
const addStudent = async (req, res) => {
    const { firstName,lastName, rollNumber, department, yearOfPassing } = req.body;

    try {
        const newStudent = new Student({ firstName, lastName, rollNumber, department, yearOfPassing });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getStudent = async (req, res) => {
    try {
        const token = req.cookies.token;
        const userId = jwt.verify(token, SECRET_KEY);
        const student = await Student.findOne({rollNumber: userId.rollNumber});
        if (!student) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
  
        res.json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
  };



module.exports = { getStudents, addStudent, getStudent };
