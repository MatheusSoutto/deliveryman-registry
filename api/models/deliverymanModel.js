const mongoose = require('../database/connection');

const DeliverymanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  document: {
    type: String,
    unique: true,
    required: true
  },
  plate: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  visited: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: Buffer,
    required: true
  }
});

const Deliveryman = mongoose.model('Deliveryman', DeliverymanSchema);

module.exports = Deliveryman;