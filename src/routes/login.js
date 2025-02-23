const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'hello'; 


router.post('/login', async (req, res) => {
  const { rollNumber, password } = req.body;

  try {
    const user = await User.findOne({ rollNumber });
    if (!user) {
      return res.status(400).json('Invalid roll number or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json('Invalid roll number or password');
    }

    const token = jwt.sign({ id: user._id, rollNumber: user.rollNumber }, SECRET_KEY, {
      expiresIn: '1h'
    });

    // res.cookie("abc", "xyz");
    res.cookie('token', token, {
      httpOnly: true, 
      secure: false,
      maxAge: 3600000 // 1 hour
    });
    res.status(200).json('Login successful');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;
