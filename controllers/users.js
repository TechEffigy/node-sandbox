const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');
const Item = require('../models/item');

const generateCookie = (res, id) => {
  const token = jwt.sign({ _id: id }, config.encSecret);
  res.cookie('token', token, { httpOnly: true, secure: false });
};

module.exports = {
  signup: async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();
    if (foundUser) {
      return res.status(403).json({ error: 'Email already exists' });
    }
    const newUser = new User({ email, password });
    await newUser.save();

    generateCookie(res, newUser._id);
    res.status(200).json({ message: 'Successful' });
  },

  signin: async (req, res) => {
    generateCookie(res, req.user._id);
    res.status(200).json({ message: 'Successful' });
  },

  secret: async (req, res) => {
    res.status(200).json({ message: 'Access Granted' });
  },

  deactivate: async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    await user.remove();
    res.status(200).send('Deactivated');
  },

  me: async (req, res) => {
    const user = await User.find({ _id: req.user._id })
      .select('email')
      .exec();
    const userItems = await Item.find({ user_id: req.user._id })
      .select('name description')
      .exec();
    res.status(200).json(Object.assign(...user, { items: userItems }));
  },
};
