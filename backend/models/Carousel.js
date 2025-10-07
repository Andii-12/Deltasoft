const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Carousel Image'
  },
  subtitle: {
    type: String,
    default: 'Image Slide'
  },
  description: {
    type: String,
    default: 'Carousel image slide'
  },
  icon: {
    type: String,
    default: '💻'
  },
  bgColor: {
    type: String,
    default: 'bg-gradient-to-br from-primary/10 to-primary/5'
  },
  image: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Carousel', carouselSchema);

