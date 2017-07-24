const express = require('express');
const router = express.Router();
const datasourcesController = require('../controllers/datasources');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// datasource routes
router.get('/', datasourcesController.list);

// View a datasource by id
router.get('/show/:id', datasourcesController.show);

// Upload a new datasource
router.get('/upload', datasourcesController.upload);

// Save the datasource to db
router.post('/save', datasourcesController.save);

// Delete a datasource
router.post('/delete/:id', datasourcesController.delete);

module.exports = router;
