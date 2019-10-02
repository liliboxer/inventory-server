const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
// create
  .post('/', (req, res, next) => {
    const { category, name, count } = req.body;
    Item
      .create({ category, name, count })
      .then(item => res.send(item))
      .catch(next);
  })
// read
// update > increment count
// delete 
