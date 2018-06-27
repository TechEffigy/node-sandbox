const Joi = require('joi');

const authCheck = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(5)
    .max(50)
    .required(),
});

module.exports = {
  authCheck,
};
