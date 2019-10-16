const { Router } = require('express');
const Item = require('../models/Item');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { category, name, quantity } = req.body.item;
    Item
      .create({ category, name, quantity })
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
  })

  .delete('/:id', (req, res, next) => {
    Item
      .findByIdAndDelete(req.params.id)
      .then(item => res.send(item))
      .catch(next);
  });
