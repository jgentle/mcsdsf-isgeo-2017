const express = require('express');
const router = express.Router();
const systemsModelConfigurationsController = require('../controllers/systemsModelConfigurations');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.

// Get all systemsModels
router.get('/', systemsModelConfigurationsController.list);

// Get single systemsModel by id
router.get('/show/:id', systemsModelConfigurationsController.show);

// Create systemsModel
router.get('/create', systemsModelConfigurationsController.create);

// Save systemsModel
router.post('/save', systemsModelConfigurationsController.save);

// Edit systemsModel
router.get('/edit/:id', systemsModelConfigurationsController.edit);

// Edit update
router.post('/update/:id', systemsModelConfigurationsController.update);

// Edit update
router.post('/delete/:id', systemsModelConfigurationsController.delete);

module.exports = router;
