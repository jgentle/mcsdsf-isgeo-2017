const express = require('express');
const router = express.Router();
const formulationsController = require('../controllers/formulations');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.
router.get('/', formulationsController.getFormulations);

module.exports = router
