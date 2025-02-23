const express = require('express');
const User = require('../models/user');
const Student = require('../models/student');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstName, lastName, rollNumber, department, password, confirmPassword, yearOfPassing } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const existingUser = await User.findOne({ rollNumber });
    if (existingUser) {
      return res.status(400).json('User already exists');
    }
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, rollNumber, department, password, yearOfPassing });
    await newUser.save();
    const newStudent = new Student({
      firstName,
      lastName,
      rollNumber,
      department,
      yearOfPassing
    });
    await newStudent.save();
    res.status(201).json('User created successfully');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;
