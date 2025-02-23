const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();

router.post('/admin-signup', async (req, res) => {
  const { username, password, confirmPassword} = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json('User already exists');
    }
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({ username, password});
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (err) {
    res.status(500).json('Server error');
  }
});

module.exports = router;
