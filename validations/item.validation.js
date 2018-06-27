const Joi = require('joi');

const ItemCheck = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = {
  ItemCheck,
};
