const express = require('express');
const router = express.Router();
const formulationController = require('../controllers/formulation');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes.

// Get all formulations
router.get('/', formulationController.list);

// Get single formulation by id
router.get('/show/:id', formulationController.show);

// Create formulation
router.get('/create', formulationController.create);

// Save formulation
router.post('/save', formulationController.save);

// Edit formulation
router.get('/edit/:id', formulationController.edit);

// Edit update
router.post('/update/:id', formulationController.update);

// Edit update
router.post('/delete/:id', formulationController.delete);

module.exports = router;
