const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  rollNumber: { type: String, unique: true, required: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  yearOfPassing: {type: String, required:true},
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hashing password
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // Comparing hashed password
};

const User = mongoose.model('User', userSchema);
module.exports = User;
