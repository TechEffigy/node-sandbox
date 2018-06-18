const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const { cbToPromise } = require('../helpers/promisify');

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const foundUser = await User.findOne({ email }).exec();
      if (!foundUser) {
        return done(null, false);
      }

      const isMatch = await cbToPromise(bcrypt.compare)(password, foundUser.password);
      if (isMatch) {
        return done(null, foundUser);
      }

      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  },
);
