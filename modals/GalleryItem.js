const mongoose = require('mongoose');

const GallerySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: false
  },
  mainImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('galleryItem', GallerySchema);
