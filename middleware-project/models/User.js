const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  lastLogin: Date,
  lastLogout: Date,
  lastActive: Date
});

userSchema.pre('save', function(next) {
  this.lastActive = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema);