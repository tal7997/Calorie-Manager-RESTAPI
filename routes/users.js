/**
 * Developers:
 * First Name: Tal
 * Last Name: Zechariya
 * ID: 318686532
 *
 * First Name: Shay
 * Last Name: Shuv
 * ID: 206842585
 *
 * First Name: Leor
 * Last Name: Marshall
 * ID: 315421990
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // ייבוא מודל המשתמשים

// GET detailed description of a specific user by their ID
router.get('/:id', async function(req, res, next) {
  try {
    // Extract the user ID from the URL parameters
    const userId = parseInt(req.params.id);

    // Check if the user exists in the users collection by 'id' using Mongoose
    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register the user first.' });
    }

    // If the user exists, return the detailed user information
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details', error });
  }
});

module.exports = router;
