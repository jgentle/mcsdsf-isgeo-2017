const express = require('express');
const router = express.Router();
const formulationConfigurationsController = require('../controllers/formulationConfigurations');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.

// Get all formulations
router.get('/', formulationConfigurationsController.list);

// Get single formulation by id
router.get('/show/:id', formulationConfigurationsController.show);

// Create formulation
router.get('/create', formulationConfigurationsController.create);

// Save formulation
router.post('/save', formulationConfigurationsController.save);

// Edit formulation
router.get('/edit/:id', formulationConfigurationsController.edit);

// Edit update
router.post('/update/:id', formulationConfigurationsController.update);

// Edit update
router.post('/delete/:id', formulationConfigurationsController.delete);

module.exports = router;
