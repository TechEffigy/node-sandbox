const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Item = require('./item');

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
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
    },
  ],
});

userSchema.pre('save', async function saveHook(next) {
  try {
    const salt = await cbToPromise(bcrypt.genSalt)(10);
    const passHash = await cbToPromise(bcrypt.hash)(this.password, salt, null);
    this.password = passHash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('remove', async function delHook(next) {
  try {
    await Item.remove({ user_id: this._id }).exec();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('user', userSchema);
