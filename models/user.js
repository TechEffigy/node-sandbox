const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Item = require('./item');

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

/*
    preSave Hook for storing hashed passwords
*/
userSchema.pre('save', async function saveHook(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(this.password, salt);
    this.password = passHash;
    next();
  } catch (err) {
    next(err);
  }
});

/*
    presave hook for deleting a user, deletes all items associated with the user.
*/
userSchema.pre('remove', async function delHook(next) {
  try {
    await Item.remove({ user_id: this._id }).exec();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('user', userSchema);
