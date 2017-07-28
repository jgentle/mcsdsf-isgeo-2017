const express = require('express');
const router = express.Router();
const systemsModelsController = require('../controllers/systemsModels');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.

// Get all formulations
router.get('/', systemsModelsController.list);

// Get single formulation by id
router.get('/show/:id', systemsModelsController.show);

// Create formulation
router.get('/create', systemsModelsController.create);

// Save formulation
router.post('/save', systemsModelsController.save);

// Edit formulation
router.get('/edit/:id', systemsModelsController.edit);

// Edit update
router.post('/update/:id', systemsModelsController.update);

// Edit update
router.post('/delete/:id', systemsModelsController.delete);

module.exports = router;
