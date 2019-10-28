const mongoose = require('mongoose');

const AvatarSchema = mongoose.Schema({
  name: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('avatar', AvatarSchema);
