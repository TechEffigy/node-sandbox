const passport = require('passport');

const authorize = require('./authorize');
const { localStrategy } = require('./authenticate');

module.exports = (app) => {
  app.use(passport.initialize());
  passport.use('local', localStrategy);
  passport.use('jwt', authorize);
};
