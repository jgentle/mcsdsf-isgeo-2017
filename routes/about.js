const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/about');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes
router.get('/', aboutController.index);

module.exports = router;
