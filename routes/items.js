const express = require('express');
const passport = require('passport');
const Joi = require('joi');
const validator = require('express-joi-validation')({ passError: true });

const { mwPromise } = require('../helpers/promisify');
const ItemsController = require('../controllers/items');

// Item Body Validation Scheme
const ItemCheck = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

const router = express.Router();
router.use(passport.authenticate('jwt', { session: false, failWithError: true }));

/*
    Create & Retrieve Items
*/
router
  .route('/')
  .get(mwPromise(ItemsController.getAll))
  .post(validator.body(ItemCheck), mwPromise(ItemsController.create));

module.exports = router;
