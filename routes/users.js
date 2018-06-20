const express = require('express');
const passport = require('passport');
const Joi = require('joi');
const validator = require('express-joi-validation')({ passError: true });

const { mwPromise } = require('../helpers/promisify');
const UsersController = require('../controllers/users');

const router = express.Router();

// Joi Validation Scheme
const authCheck = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required(),
});

/*
    Adds a new User
*/
router.route('/signup').post(validator.body(authCheck), mwPromise(UsersController.signup));

/*
    Sign the user in
*/
router
  .route('/signin')
  .post(
    validator.body(authCheck),
    passport.authenticate('local', { session: false, failWithError: true }),
    mwPromise(UsersController.signin),
  );

/*
    Deletes Account & Items the User owns
*/
router
  .route('/deactivate')
  .delete(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    mwPromise(UsersController.deactivate),
  );

/*
    Retrieves User Information & all items of that user
*/
router
  .route('/me')
  .get(
    passport.authenticate('jwt', { session: false, failWithError: true }),
    mwPromise(UsersController.me),
  );
module.exports = router;
