const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  } });

module.exports = mongoose.model('Item', itemSchema);
