const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Requiring User model schema from ../models/User
const User = require('../models/User');
// Requiring Contact model schema from ../models/Contact
const Contact = require('../models/Contact');

// The express.Router() function is used to create a new router object.
// This function is used when you want to create a new router object in your program to handle requests.

// =========================================================
// @route   GET api/contact
// @desc    Get all user contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.present_user.id }).sort({
      date: -1, //it will sort the most recent contacts first
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// =========================================================
// @route   POST api/contact
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [auth, check('name', 'Name is required').not().isEmpty()],
  async (req, res) => {
    // res.send('Add contact');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error_msg: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name: name,
        email: email,
        phone: phone,
        type: type,
        user: req.present_user.id,
      });

      // save in the database
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// =========================================================
// @route   PUT api/contact/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    // console.log(req.present_user);
    // Make sure user owns contact
    if (contact.user.toString() !== req.present_user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// =========================================================
// @route   DELETE api/contact/:id
// @desc    Update contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  // res.send('Delete contact');
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    // Make sure user owns contact
    if (contact.user.toString() !== req.present_user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// =========================================================

module.exports = router;
