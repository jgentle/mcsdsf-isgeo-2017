const express = require('express');
const router = express.Router();
const formulationsController = require('../controllers/formulations');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.

// Get all formulations
router.get('/', formulationsController.list);

// Get single formulation by id
router.get('/show/:id', formulationsController.show);

// Create formulation
router.get('/create', formulationsController.create);

// Save formulation
router.post('/save', formulationsController.save);

// Edit formulation
router.get('/edit/:id', formulationsController.edit);

// Edit update
router.post('/update/:id', formulationsController.update);

// Edit update
router.post('/delete/:id', formulationsController.delete);

module.exports = router;
