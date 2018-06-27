const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../models/user');
const Item = require('../models/item');

const generateCookie = (res, id) => {
  const token = jwt.sign({ _id: id }, config.encSecret);
  res.cookie('token', token, { httpOnly: true, secure: false });
};

async function signup(req, res, next) {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email }).exec();

    if (foundUser) {
      res.status(403).json({ error: 'Email already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    generateCookie(res, newUser._id);
    res.json({ message: 'Successful' });
  } catch (error) {
    next(error);
  }
}

function signin(req, res) {
  generateCookie(res, req.user._id);
  res.json({ message: 'Successful' });
}

function secret(req, res) {
  res.json({ message: 'Access Granted' });
}

async function deactivate(req, res, next) {
  try {
    const user = await User.findById(req.user._id).exec();
    await user.remove();
    res.send('Deactivated');
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await User.find({ _id: req.user._id })
      .select('email')
      .exec();
    const userItems = await Item.find({ user_id: req.user._id })
      .select('name description')
      .exec();

    res.json(Object.assign(...user, { items: userItems }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
  secret,
  deactivate,
  me,
};
