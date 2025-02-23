const express = require('express');
const { getStudents, addStudent, getStudent } = require('../controllers/studentController');
const router = express.Router();

router.get('/getStudents', getStudents);
router.post('/addStudent', addStudent);
router.get('/getStudent', getStudent);


module.exports = router;
