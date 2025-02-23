const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY; 

router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(400).json('Invalid username or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json('Invalid username or password');
    }
    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h'
    });
    res.cookie('token', token, {
      httpOnly: true, 
      secure: false,
      maxAge: 3600000, // 1 hour
      sameSite: 'none'
    });
    res.status(200).json('Login successful');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;
