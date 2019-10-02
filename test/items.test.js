require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

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
        count: 10
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          category: 'clothing',
          name: 't-shirt',
          count: 10
        });
      });
  });

});
