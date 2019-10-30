const express = require('express');
const router = express.Router();
const _ = require('lodash');

// Avatar Schema
const GalleryItem = require('../modals/GalleryItem');

// @route    POST api/gallery
// @desc     Upload gallery item
// @access   Public (should be private)
router.post('/', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      let imageData = [];

      let mainImage = req.files.mainImage;

      mainImage.mv('./uploads/' + mainImage.name);

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

      const { name, price, category, description } = req.body;

      const newGalleryItem = new GalleryItem({
        name,
        price,
        category,
        description,
        imagesObject
      });

      const galleryObject = await newGalleryItem.save();

      //return response
      res.send({
        status: true,
        message: 'Gallery item saved to database',
        galleryObject
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// @route    GET api/gallery
// @desc     Get all Gallery Items
// @access   Public
router.get('/', async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find({
      category: req.body.category
    });

    res.json(galleryItems);
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

  // Buld Contact Object
  const galleryItemFields = {};
  if (name) galleryItemFields.name = name;
  if (price) galleryItemFields.price = price;
  if (category) galleryItemFields.category = category;
  if (description) galleryItemFields.description = description;

  if (req.files) {
    let imageData = [];

    let mainImage = req.files.mainImage;

    mainImage.mv('./uploads/' + mainImage.name);

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

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
