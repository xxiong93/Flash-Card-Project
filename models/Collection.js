const mongoose = require('mongoose');
const mongoCard = require('./Card');

const collectionSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1 },
  cards: [mongoCard.schema],
});

module.exports = mongoose.model('Collection', collectionSchema);
