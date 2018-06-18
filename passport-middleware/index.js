const passport = require('passport');

const authorize = require('./authorize');
const authenticate = require('./authenticate');

module.exports = (app) => {
  app.use(passport.initialize());
  passport.use('local', authenticate);
  passport.use('jwt', authorize);
};
