const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// Requiring User model schema from ../models/User
const User = require('../models/User');

// @route   POST api/users
// @desc    register a user
// @access  Public

router.post(
  '/',
  [
    check('name_register', 'Please add a name').not().isEmpty(),
    check('email_register', 'Please include a valid email').isEmail(),
    check(
      'password_register',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error_msg: errors.array() });
    }

    const { name_register, email_register, password_register } = req.body;

    try {
      // here we are checking if the new user already exist
      let new_user = await User.findOne({ email: email_register });
      if (new_user) {
        return res.status(400).json({ msg: 'User already exist' });
      }

      new_user = new User({
        name: name_register,
        email: email_register,
        password: password_register,
      });

      // before saving the password we need to hash it with becrypt.
      const salt = await bcrypt.genSalt(10);
      // now this salt will be used to hash the password
      new_user.password = await bcrypt.hash(password_register, salt);

      // Now save in the database
      await new_user.save();
      // Generating tokens
      const payload = {
        user: {
          id: new_user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000, //100 hours
        },
        (err, token) => {
          if (err) throw err;
          // finally we are sending the response as token
          res.json({ token });
        }
      );

      // res.send('User saved');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
