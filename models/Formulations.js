const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const formulationsSchema = new mongoose.Schema({
  formulationName: String,
  dataSourceFile: String,
  dataSourceFileType: String,
  geodataSourceFile: String,
  geodataSourceFileType: String
});

const Formulations = mongoose.model('Formulations', formulationsSchema);

module.exports = Formulations;
