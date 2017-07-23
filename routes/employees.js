const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// define routes

// Get all employees
router.get('/', employeeController.list);

// Get single employee by id
router.get('/show/:id', employeeController.show);

// Create employee
router.get('/create', employeeController.create);

// Save employee
router.post('/save', employeeController.save);

// Edit employee
router.get('/edit/:id', employeeController.edit);

// Edit update
router.post('/update/:id', employeeController.update);

// Edit update
router.post('/delete/:id', employeeController.delete);

module.exports = router
