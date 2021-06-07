const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Requiring User model schema from ../models/User
const User = require('../models/User');

// The express.Router() function is used to create a new router object.
// This function is used when you want to create a new router object in your program to handle requests.

// @route    GET api/auth
// @desc     Get logged user
// @access   Private
// this is protected route (means the user should not see it if they are not logged in)....we check this by auth middleware
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.present_user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// ====================================================================
// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email_login', 'Please include a valid email').isEmail(),
    check('password_login', 'password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error_msg: errors.array() });
    }

    const { email_login, password_login } = req.body;

    try {
      let user_found = await User.findOne({ email: email_login });

      // If the email doesn't match with the database
      if (!user_found) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if there is a user_found then check password with
      // bcrypt.compare(the password that we entered during login, password present in database)
      const isMatch = await bcrypt.compare(password_login, user_found.password);

      // If the password doesn't match.
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // if the password matches then generate token
      const payload = {
        // user_already_present: {
        //   id: user_found.id,
        // },
        user: {
          id: user_found.id,
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
