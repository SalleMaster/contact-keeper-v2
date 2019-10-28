const express = require('express');
const router = express.Router();
const _ = require('lodash');

// Avatar Schema
const Photos = require('../modals/Photos');

// @route    POST upload-photos
// @desc     Upload photos
// @access   Public
router.post('/', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      let data = [];

      //loop all files
      _.forEach(_.keysIn(req.files.photos), key => {
        let photo = req.files.photos[key];

        //move photo to upload directory
        photo.mv('./uploads/' + photo.name);

        //push file details
        data.push({
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size
        });
      });

      const photos = data.map(photo => photo.name);

      const group = req.body.group;

      const newPhotos = new Photos({
        name: photos,
        group
      });

      const photosObject = await newPhotos.save();

      //return response
      res.send({
        status: true,
        message: 'Files are uploaded',
        data: data
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
