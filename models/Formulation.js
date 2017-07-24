// const bcrypt = require('bcrypt-nodejs');
// const crypto = require('crypto');
const mongoose = require('mongoose');

const formulationSchema = new mongoose.Schema({
  formulationName: String,
  dataSourceFile: String,
  dataSourceFileType: String,
  geodataSourceFile: String,
  geodataSourceFileType: String
}, { timestamps: true });

const Formulation = mongoose.model('Formulation', formulationSchema);

module.exports = Formulation;
