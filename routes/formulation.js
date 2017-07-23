const express = require('express');
const router = express.Router();
const formulationController = require('../controllers/formulation');

// middleware
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })

// route middleware to validate :id
// router.param('id', function(req, res, next, id) {
//     console.log('validating ' + id + ' exists');
//     //find the ID in the Database
//     mongoose.model('Formulation').findById(id, function (err, formulation) {
//         //if it isn't found, we are going to repond with 404
//         if (err) {
//             console.log(id + ' was not found');
//             res.status(404)
//             var err = new Error('Not Found');
//             err.status = 404;
//             res.format({
//                 html: function(){
//                     next(err);
//                  },
//                 json: function(){
//                        res.json({message : err.status  + ' ' + err});
//                  }
//             });
//         //if it is found we continue on
//         } else {
//             //uncomment this next line if you want to see every JSON document response for every GET/PUT/DELETE call
//             console.log(formulation);
//             // once validation is done save the new item in the req
//             req.id = id;
//             // go to the next thing
//             next();
//         }
//     });
// });

// define routes.
router.get('/:_id', formulationController.getFormulation);
router.post('/', formulationController.createFormulation);
router.put('/', formulationController.updateFormulation);
router.delete('/', formulationController.deleteFormulation);

// Combine route with router?
// router.route('/')
//   .get(formulationController.getFormulation)
//   .post(formulationController.createFormulation)
//   .put(formulationController.updateFormulation)
//   .delete(formulationController.deleteFormulation);

module.exports = router
