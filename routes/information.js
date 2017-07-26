const express = require('express');
const router = express.Router();
const informationController = require('../controllers/information');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes
// router.get('/', informationController.index);
router.get('/tutorial', informationController.tutorial);
router.get('/faq', informationController.faq);
router.get('/about', informationController.about);

module.exports = router;
