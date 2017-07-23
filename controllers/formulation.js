const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Formulation = require('../models/Formulation.js');

/**
 * GET /formulation
 * List a formulation.
 */

exports.getFormulation = (req, res) => {
  // Formulation.find((err, formulation) => {
  //   res.render('formulation', {
  //     title: 'Formulation',
  //     formulation: formulation
  //   });
  //   console.log(`Current formulation.`);
  // });
  Formulation.findOne({_id: req.params.id}, function(err, formulation) {
    console.log(req.params);
    res.render('formulation', {
      title: 'Formulation',
      formulation: formulation
    });
    console.log('Current formulation:', formulation);
  });
};

// employeeController.show = function(req, res) {
//   Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
//     if (err) {
//       console.log("Error:", err);
//     }
//     else {
//       res.render("../views/employees/show", {employee: employee});
//     }
//   });
// };

/**
 * POST /formulation
 * Create a formulation.
 */

exports.createFormulation = (req, res) => {
  console.log('POST received');
  console.log(req.body);

  const formulation = new Formulation({
    formulationName: req.body.formulationName,
    dataSourceFile: req.body.dataSourceFile,
    dataSourceFileType: req.body.dataSourceFileType,
    geodataSourceFile: req.body.geodataSourceFile,
    geodataSourceFileType: req.body.geodataSourceFileType
  });

  formulation.save(req.body, (err, result) => {
    if (err) { return console.log(err) }

    console.log(`Created new formulation named ${formulationName}.`);
    console.log('saved to database')
    res.redirect('/formulations')
  });
};

/**
 * UPDATE /formulation
 * Update a formulation.
 */

exports.updateFormulation = (req, res) => {
  console.log('PUT received');
  console.log(req.body);

  const formulation = new Formulation({
    formulationName: req.body.formulationName,
    dataSourceFile: req.body.dataSourceFile,
    dataSourceFileType: req.body.dataSourceFileType,
    geodataSourceFile: req.body.geodataSourceFile,
    geodataSourceFileType: req.body.geodataSourceFileType
  });

  formulation.findOneAndUpdate(
    // query
    { formulationName: req.body.formulationName },
    // update
    {
      $set: {
        formulationName: req.body.formulationName,
        dataSourceFile: req.body.dataSourceFile,
        dataSourceFileType: req.body.dataSourceFileType,
        geodataSourceFile: req.body.geodataSourceFile,
        geodataSourceFileType: req.body.geodataSourceFileType
      }
    },
    // options
    {},
    // callback
    (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    }
  );

  res.redirect('/formulations')
};

/**
 * DELETE /formulation
 * Delete a formulation.
 */

exports.deleteFormulation = (req, res) => {
  console.log(`Deleted formulation named ${formulationName}.`);
};
