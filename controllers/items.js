const Item = require('../models/item');

async function getAll(req, res, next) {
  try {
    const items = await Item.find({ user_id: req.user._id });
    res.send(items);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, description } = req.body;

    const newItem = new Item({ user_id: req.user._id, name, description });
    await newItem.save();

    res.json({ message: 'Successful' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  create,
};
