const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// User Schema
const User = require('../modals/User');

// @route    POST api/users
// @desc     Register a User
// @access   Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter a password with six or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send(req.body);
  }
);

module.exports = router;
