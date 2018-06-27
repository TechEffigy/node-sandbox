const express = require('express');
const userRoutes = require('./users');
const itemRoutes = require('./items');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/items', itemRoutes);

module.export = router;
