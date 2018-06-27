const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

/*
    Authentication for passport for signing-in
*/

const localStrategy = new LocalStrategy(
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

      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        return done(null, foundUser);
      }

      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  },
);

const authorize = () => {
  passport.authenticate('jwt', { session: false, failWithError: true });
};

module.exports = {
  localStrategy,
  authorize,
};
