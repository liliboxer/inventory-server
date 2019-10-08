require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Item = require('../lib/models/Item');
describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an item', () => {
    return request(app)
      .post('/api/v1/items')
      .send({ 
        category: 'clothing', 
        name: 't-shirt', 
        quantity: 10 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String), 
          category: 'clothing', 
          name: 't-shirt', 
          quantity: 10 });
      });
  });

  it('gets all items', async() => {
    const items = JSON.parse(JSON.stringify(await Item.create([
      { category: 'outdoor', name: 'hiking boots', quantity: 2 },
      { category: 'kitchen', name: 'skillet', quantity: 1 },
      { category: 'clothing', name: 'dress pants', quantity: 4 },
    ])));
    return request(app)
      .get('/api/v1/items')
      .then(res => {
        items.forEach(item => {
          expect(res.body).toContainEqual({
            _id: item._id.toString(),
            category: item.category,
            name: item.name,
            quantity: item.quantity
          });
        });
      });
  });

  it('update quantity of item', async() => {
    const item = await Item.create({ 
      category: 'bathroom', 
      name: 'soap', 
      quantity: 10 
    });
    return request(app)
      .patch(`/api/v1/items/${item._id}`)
      .send({ quantity: 3 })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          category: 'bathroom',
          name: 'soap',
          quantity: 3
        });
      });
  });

  it('delete item by id', async() => {
    const item = await Item.create({ 
      category: 'pets', 
      name: 'cat tree', 
      quantity: 3 
    });
    return request(app)
      .delete(`/api/v1/items/${item._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          category: 'pets', 
          name: 'cat tree', 
          quantity: 3 
        });
      });
  });

});
