const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const fs = require("fs");

// Avatar Schema
const GalleryItem = require("../modals/GalleryItem");

// @route    POST api/gallery
// @desc     Upload gallery item
// @access   Public (should be private)
router.post(
  "/",
  [
    check("name", "Please enter Gallery Item Name")
      .not()
      .isEmpty(),
    check("price", "Please enter Gallery Item Price")
      .not()
      .isEmpty(),
    check("category", "Please enter Gallery Item Category")
      .not()
      .isEmpty(),
    check("description", "Please enter Gallery Item Description")
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

      // Check if mainImage is uploaded
      if (req.files === null || req.files.mainImage === undefined) {
        return res.status(400).json({ msg: "Main image must be uploaded" });
      } else {
        let mainImage = req.files.mainImage;
        mainImage.mv("./uploads/" + mainImage.name);

        // Check if images are uploaded
        if (req.files.images) {
          let images = req.files.images;

          let imagesArray = [];
          // Save other images to Server
          //loop all files
          _.forEach(_.keysIn(images), key => {
            let image = req.files.images[key];

            //move photo to upload directory
            image.mv("./uploads/" + image.name);
            imagesArray.push(image.name);
          });

          const newGalleryItem = new GalleryItem({
            name,
            price,
            category,
            description,
            images: imagesArray,
            mainImage: mainImage.name
          });

          const galleryObject = await newGalleryItem.save();

          //return response
          res.send(galleryObject);
        } else {
          const newGalleryItem = new GalleryItem({
            name,
            price,
            category,
            description,
            mainImage: mainImage.name
          });

          const galleryObject = await newGalleryItem.save();

          //return response
          res.send(galleryObject);
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/gallery
// @desc     Get all Gallery Items
// @access   Public
router.get("/:category*?", async (req, res) => {
  try {
    // Category Field Optinal
    if (req.params.category) {
      const galleryItems = await GalleryItem.find({
        category: req.params.category
      });
      res.json(galleryItems);
    } else {
      const galleryItems = await GalleryItem.find({});
      res.json(galleryItems);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/gallery:id
// @desc     Update gallery item
// @access   Public (Should be private)
// router.put("/:id", async (req, res) => {
router.put("/", async (req, res) => {
  const { name, price, category, description, _id } = req.body;

  // Buld GalleryItem Object
  const galleryItemFields = {};
  if (name) galleryItemFields.name = name;
  if (price) galleryItemFields.price = price;
  if (category) galleryItemFields.category = category;
  if (description) galleryItemFields.description = description;

  console.log(req.body);
  try {
    let item = await GalleryItem.findById(_id);

    if (!item) {
      return res.status(404).json({ msg: "Gallery item not found" });
    }
    // If user sent files include them also
    if (req.files) {
      console.log("files run");
      // Check for main image update
      if (req.files.mainImage) {
        console.log("main image ran");
        // Delete original mainImage
        fs.unlink(`./uploads/${item.mainImage}`, err => {
          if (err) {
            console.error(err);
            return;
          }
        });
        let mainImage = req.files.mainImage;
        mainImage.mv("./uploads/" + mainImage.name);
        galleryItemFields.mainImage = mainImage.name;
      }

      // check for images update
      if (req.files.images) {
        console.log("images ran");
        // Delete images
        item.images.map(image => {
          const path = `./uploads/${image}`;
          fs.unlink(path, err => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
        let images = req.files.images;
        let imagesArray = [];
        // Save other images to Server
        //loop all files
        _.forEach(_.keysIn(images), key => {
          let image = req.files.images[key];

          //move photo to upload directory
          image.mv("./uploads/" + image.name);
          imagesArray.push(image.name);
        });

        galleryItemFields.images = imagesArray;
      }
    }

    item = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      { $set: galleryItemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/gallery:id
// @desc     Delete a gallery item
// @access   Public (should be private)
router.delete("/:id", async (req, res) => {
  try {
    let galleryItem = await GalleryItem.findById(req.params.id);

    const { images, mainImage } = galleryItem;

    // Delete mainImage
    fs.unlink(`./uploads/${mainImage}`, err => {
      if (err) {
        console.error(err);
        return;
      }
    });

    // Delete images
    images.map(image => {
      const path = `./uploads/${image}`;
      fs.unlink(path, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });

    if (!galleryItem) {
      return res.status(404).json({ msg: "Gallery Item not found" });
    }

    await GalleryItem.findByIdAndRemove(req.params.id);

    res.json({ msg: "Gallery Item Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
