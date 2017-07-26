const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes
router.get('/', dashboardController.dashboard);
router.get('/populate', dashboardController.populate);

module.exports = router;
