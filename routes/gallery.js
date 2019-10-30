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
        images,
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

module.exports = router;
