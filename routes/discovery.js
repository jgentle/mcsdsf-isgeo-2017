const express = require('express');
const router = express.Router();
const discoveryController = require('../controllers/discovery');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes
router.get('/', discoveryController.discover);
router.get('/configure', discoveryController.configure);

module.exports = router;
