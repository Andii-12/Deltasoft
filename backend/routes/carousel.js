const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Carousel = require('../models/Carousel');
const { auth } = require('./auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/carousel/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'carousel-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get all carousel slides (public)
router.get('/', async (req, res) => {
  try {
    const slides = await Carousel.find({ active: true }).sort({ order: 1 });
    res.json(slides || []);
  } catch (error) {
    console.error('Error fetching carousel slides:', error);
    // Return empty array instead of error for public route
    res.json([]);
  }
});

// Get single slide (admin)
router.get('/:id', auth, async (req, res) => {
  try {
    const slide = await Carousel.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json(slide);
  } catch (error) {
    console.error('Error fetching slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new slide (admin)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const { order } = req.body;
    
    const slideData = {
      title: 'Carousel Image',
      subtitle: 'Image Slide',
      description: 'Carousel image slide',
      icon: '🖼️',
      bgColor: 'bg-gradient-to-br from-primary/10 to-primary/5',
      image: '/uploads/carousel/' + req.file.filename,
      order: order || 0
    };

    const slide = new Carousel(slideData);
    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    console.error('Error creating slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update slide (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, subtitle, description, icon, bgColor, order, active } = req.body;
    
    const slide = await Carousel.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    slide.title = title || slide.title;
    slide.subtitle = subtitle || slide.subtitle;
    slide.description = description || slide.description;
    slide.icon = icon || slide.icon;
    slide.bgColor = bgColor || slide.bgColor;
    if (order !== undefined) slide.order = order;
    if (active !== undefined) slide.active = active;

    await slide.save();
    res.json(slide);
  } catch (error) {
    console.error('Error updating slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reorder slides (admin)
router.post('/reorder', auth, async (req, res) => {
  try {
    const { slides } = req.body;
    
    const updatePromises = slides.map(({ id, order }) =>
      Carousel.findByIdAndUpdate(id, { order })
    );
    
    await Promise.all(updatePromises);
    res.json({ message: 'Slides reordered successfully' });
  } catch (error) {
    console.error('Error reordering slides:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete slide (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const slide = await Carousel.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }

    await slide.deleteOne();
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    console.error('Error deleting slide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

