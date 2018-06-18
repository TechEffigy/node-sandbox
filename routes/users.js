const express = require('express');
const passport = require('passport');
const Joi = require('joi');
const validator = require('express-joi-validation')({});

const { mwPromise } = require('../helpers/promisify');
const UsersController = require('../controllers/users');

const router = express.Router();

const emailPassCheck = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required(),
});

router.route('/signup').post(validator.body(emailPassCheck), mwPromise(UsersController.signup));
router
  .route('/signin')
  .post(
    validator.body(emailPassCheck),
    passport.authenticate('local', { session: false }),
    mwPromise(UsersController.signin),
  );
router
  .route('/secret')
  .get(passport.authenticate('jwt', { session: false }), mwPromise(UsersController.secret));

module.exports = router;
