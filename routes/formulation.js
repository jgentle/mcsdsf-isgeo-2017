const express = require('express');
const router = express.Router();
const formulationController = require('../controllers/formulation');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.
// router.get('/', formulationController.getFormulation);

// Combine route with router?
router.route('/')
  .get(formulationController.getFormulation)
  .post(formulationController.createFormulation)
  .put(formulationController.updateFormulation)
  .delete(formulationController.deleteFormulation);

module.exports = router
