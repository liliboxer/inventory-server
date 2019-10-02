const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { category, name, count } = req.body;
    Item
      .create({ category, name, count })
      .then(item => res.send(item))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Item
      .find()
      .then(items => res.send(items))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Item
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(item => res.send(item))
      .catch(next);
  });
// update > increment count
// delete 
