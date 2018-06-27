const express = require('express');
const validate = require('express-validation');

const { authCheck } = require('../validations/auth.validation');
const {
  signup, signin, deactivate, me,
} = require('../controllers/users');
const { authorize } = require('../passport-middleware/authenticate');

const router = express.Router();

/*
    Adds a new User
*/
router.route('/signup').post(validate(authCheck), signup);

/*
    Sign the user in
*/
router.route('/signin').post(validate(authCheck), authorize(), signin);

/*
    Deletes Account & Items the User owns
*/
router.route('/deactivate').delete(authorize(), deactivate);

/*
    Retrieves User Information & all items of that user
*/
router.route('/me').get(authorize(), me);

module.exports = router;
