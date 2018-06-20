const Item = require('../models/item');

module.exports = {
  getAll: async (req, res) => {
    const Items = await Item.find({ user_id: req.user._id });
    res.status(200).send(Items);
  },
  create: async (req, res) => {
    const { name, description } = req.body;

    const newItem = new Item({ user_id: req.user._id, name, description });
    await newItem.save();

    res.status(200).json({ message: 'Successful' });
  },
};
