const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const _ = require('lodash');

// Avatar Schema
const GalleryItem = require('../modals/GalleryItem');

// @route    POST api/gallery
// @desc     Upload gallery item
// @access   Public (should be private)
router.post(
  '/',
  [
    check('name', 'Please enter Gallery Item Name')
      .not()
      .isEmpty(),
    check('price', 'Please enter Gallery Item Price')
      .not()
      .isEmpty(),
    check('category', 'Please enter Gallery Item Category')
      .not()
      .isEmpty(),
    check('images', 'Please enter Gallery Item Images')
      .not()
      .isFile(),
    check('mainImage', 'Please enter Gallery Item Main Image')
      .not()
      .isFile(),
    check('description', 'Please enter Gallery Item mainImage')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Pull data from request
      const { name, price, category, description } = req.body;
      // Pull Images from request
      let mainImage = req.files.mainImage;
      let images = req.files.images;

      // Save main image to Server
      mainImage.mv('./uploads/' + mainImage.name);

      // Save other images to Server
      //loop all files
      _.forEach(_.keysIn(images), key => {
        let image = req.files.images[key];

        //move photo to upload directory
        image.mv('./uploads/' + image.name);
      });

      const newGalleryItem = new GalleryItem({
        name,
        price,
        category,
        description,
        images,
        mainImage
      });

      const galleryObject = await newGalleryItem.save();

      //return response
      res.send({
        status: true,
        message: 'Gallery item saved to database',
        galleryObject
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/gallery
// @desc     Get all Gallery Items
// @access   Public
router.get('/', async (req, res) => {
  try {
    // Category Field Optinal
    if (req.body.category) {
      const galleryItems = await GalleryItem.find({
        category: req.body.category
      });
      res.json(galleryItems);
    } else {
      const galleryItems = await GalleryItem.find({});
      res.json(galleryItems);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/gallery:id
// @desc     Update gallery item
// @access   Public (Should be private)
router.put('/:id', async (req, res) => {
  const { name, price, category, description } = req.body;

  // Buld GalleryItem Object
  const galleryItemFields = {};
  if (name) galleryItemFields.name = name;
  if (price) galleryItemFields.price = price;
  if (category) galleryItemFields.category = category;
  if (description) galleryItemFields.description = description;

  // If user sent files include them also
  if (req.files) {
    let imageData = [];

    let mainImage = req.files.mainImage;

    if (mainImage) {
      mainImage.mv('./uploads/' + mainImage.name);
    }

    //loop all files
    _.forEach(_.keysIn(req.files.images), key => {
      let image = req.files.images[key];

      //move photo to upload directory
      image.mv('./uploads/' + image.name);

      //push file details
      imageData.push({
        name: image.name,
        mimetype: image.mimetype,
        size: image.size
      });
    });

    const images = imageData.map(photo => photo.name);

    const imagesObject = {
      images,
      mainImage: mainImage.name
    };

    galleryItemFields.imagesObject = imagesObject;
  }

  try {
    let item = await GalleryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Gallery item not found' });
    }

    items = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      { $set: galleryItemFields },
      { new: true }
    );

    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/gallery:id
// @desc     Delete a gallery item
// @access   Public (should be private)
router.delete('/:id', async (req, res) => {
  try {
    let galleryItem = await GalleryItem.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ msg: 'Gallery Item not found' });
    }

    await GalleryItem.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Gallery Item Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
