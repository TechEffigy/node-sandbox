const UserSchema = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const config = require('../config');

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.token;
  }
  return null;
};

module.exports = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.encSecret,
  },
  async (jwtPayload, done) => {
    try {
      const foundUser = await UserSchema.findOne({ _id: jwtPayload._id });
      if (!foundUser) {
        return done(null, false);
      }
      return done(null, foundUser);
    } catch (err) {
      return done(err, false);
    }
  },
);
