const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
      res.status(403).json({ error: 'Email already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, config.encSecret);
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Successful' });
  },

  signin: async (req, res) => {
    const authUser = req.user;
    const token = jwt.sign({ _id: authUser._id }, config.encSecret);
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.status(200).json({ message: 'Successful' });
  },

  secret: async (req, res) => {
    res.status(200).json({ message: 'Access Granted' });
  },
};
