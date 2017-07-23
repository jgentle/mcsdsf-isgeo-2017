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
