const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const passport = require('passport');
const Formulations = require('../models/Formulations.js');

/**
 * GET /formulations
 * List all formulations.
 */

exports.getFormulations = (req, res) => {
  Formulations.find((err, formulations) => {
    res.render('formulations', {
      title: 'Formulations',
      formulations: formulations
    });
    console.log(`All formulations listed.`);
  });
};

/**
 * POST /formulations
 * Create a formulation.
 */

exports.createFormulations = (req, res) => {
  console.log('POST received');
  console.log(req.body);
  res.redirect('/formulations');

  Formulations.save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved formulation to database')
    res.redirect('/formulations')
  })
  // console.log(`Created new formulation named ${name}.`);
};

/**
 * UPDATE /formulations
 * Update a formulation.
 */

exports.updateFormulations = (req, res) => {
  console.log(`Updated formulation named ${name}.`);
};

/**
 * DELETE /formulations
 * Delete a formulation.
 */

exports.deleteFormulations = (req, res) => {
  console.log(`Deleted formulation named ${name}.`);
};
