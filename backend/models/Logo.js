const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String, // Base64 encoded image or file path
    required: true
  },
  imageType: {
    type: String,
    enum: ['base64', 'file'],
    default: 'base64'
  },
  category: {
    type: String,
    enum: ['partner', 'client', 'certification', 'award'],
    default: 'partner'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  website: {
    type: String,
    default: ''
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
logoSchema.index({ category: 1, isActive: 1 });
logoSchema.index({ displayOrder: 1 });

// Static method to get active logos by category
logoSchema.statics.getActiveLogos = async function(category = null) {
  const query = { isActive: true };
  if (category) {
    query.category = category;
  }
  
  return this.find(query)
    .sort({ displayOrder: 1, createdAt: -1 })
    .select('name description image imageType category website displayOrder');
};

// Static method to get all logos for admin
logoSchema.statics.getAllLogos = async function() {
  return this.find()
    .sort({ category: 1, displayOrder: 1, createdAt: -1 })
    .populate('uploadedBy', 'name email')
    .select('name description image imageType category isActive displayOrder website uploadedBy createdAt');
};

module.exports = mongoose.model('Logo', logoSchema);
