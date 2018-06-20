const express = require('express');
const passport = require('passport');
const Joi = require('joi');
const validator = require('express-joi-validation')({ passError: true });

const { mwPromise } = require('../helpers/promisify');
const UsersController = require('../controllers/users');

const router = express.Router();

const authCheck = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required(),
});

router.route('/signup').post(validator.body(authCheck), mwPromise(UsersController.signup));
router
  .route('/signin')
  .post(
    validator.body(authCheck),
    passport.authenticate('local', { session: false, failWithError: true }),
    mwPromise(UsersController.signin),
  );

router
  .route('/deactivate')
  .delete(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    mwPromise(UsersController.deactivate),
  );

router
  .route('/me')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    mwPromise(UsersController.me),
  );
module.exports = router;
