const mongoose = require('../database/connection');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;
  this.login = this.login.toLowerCase();

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;