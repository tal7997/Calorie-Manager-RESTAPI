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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shai Tal and Leor\'s website' });
});

module.exports = router;
