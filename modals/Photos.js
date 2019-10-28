const mongoose = require('mongoose');

const PhotosSchema = mongoose.Schema({
  name: {
    type: Array,
    required: true
  },
  group: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('photos', PhotosSchema);
