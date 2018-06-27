const express = require('express');
const passport = require('passport');
const validate = require('express-validation');
const { ItemCheck } = require('../validations/item.validation');
const { create, getAll } = require('../controllers/items');

const router = express.Router();
router.use(passport.authenticate('jwt', { session: false, failWithError: true }));

/*
    Create & Retrieve Items
*/
router
  .route('/')
  .get(getAll)
  .post(validate(ItemCheck), create);

module.exports = router;
