const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { cbToPromise } = require('../helpers/promisify');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async (next) => {
  // if (!user.isModified('password')) return next;
  try {
    const salt = await cbToPromise(bcrypt.genSalt)(10);
    const passHash = await cbToPromise(bcrypt.hash)(this.password, salt, null);
    this.password = passHash;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('user', userSchema);
