const express = require('express');
const router = express.Router();

// Avatar Schema
const Avatar = require('../modals/Avatar');

// @route    POST upload-avatar
// @desc     Upload avatar photo
// @access   Public
router.post('/', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.avatar;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv('./uploads/' + avatar.name);

      const name = ['salle1', 'salle2', 'salle3'];

      const newAvatar = new Avatar({
        name
      });

      const avatarObject = await newAvatar.save();

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
