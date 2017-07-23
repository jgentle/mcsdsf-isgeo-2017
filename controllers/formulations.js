const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Formulation = require('../models/Formulation.js');

/**
 * GET /formulations
 * List all formulations.
 */

exports.getFormulations = (req, res) => {
  Formulation.find((err, formulations) => {
    res.render('formulations', {
      title: 'Formulations',
      formulations: formulations
    });
    console.log(`All formulations.`);
  });
};

/**
 * GET /formulation
 * List a formulation.
 */

exports.getFormulation = (req, res) => {
  Formulation.find((err, formulation) => {
    res.render('formulation', {
      title: 'Formulation',
      formulation: formulation
    });
    console.log(`Current formulation.`);
  });
};

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
    geodataSourceFileType: req.body.geodataSourceFileType,
  });

  formulation.save(req.body, (err, result) => {
    if (err) { return console.log(err) }

    console.log(`Created new formulation named ${formulationName}.`);
    console.log('saved to database')
    res.redirect('/formulations')
  })
};

/**
 * UPDATE /formulation
 * Update a formulation.
 */

exports.updateFormulation = (req, res) => {
  console.log(`Updated formulation named ${formulationName}.`);
};

/**
 * DELETE /formulation
 * Delete a formulation.
 */

exports.deleteFormulation = (req, res) => {
  console.log(`Deleted formulation named ${formulationName}.`);
};
